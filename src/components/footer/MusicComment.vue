<template>
  <div class="topNav">
    <div class="allNum">
      <svg class="icon" aria-hidden="true" @click="changeCommentShow">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      热门评论({{ allNum }})
    </div>
    <svg class="icon" aria-hidden="true" @click="changeCommentShow">
      <use xlink:href="#icon-fenxiang"></use>
    </svg>
  </div>

  <div class="comments">
    <div class="comment" v-for="item in commentList" :key="item">
      <div class="top">
        <div class="left">
          <img :src="item.user.avatarUrl" />
          <div class="aboutUser">
            <div class="name">{{ item.user.nickname }}</div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
        <div class="right">
          <div class="liked">{{ item.likedCount }}</div>
          <svg class="icon" aria-hidden="true" @click="changeCommentShow">
            <use xlink:href="#icon-dianzan-"></use>
          </svg>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getMusicComment } from "@/request/api/item.js";
export default {
  props: ["id"],
  data() {
    return {
      musicId: 0,
      commentList: [],
      allNum: "",
    };
  },
  methods: {
    ...mapMutations(["changeCommentShow"]),
    createList: async function () {
      let comments = await getMusicComment(this.musicId);
    //   console.log(comments);

      comments.data.hotComments.forEach((item) => {
        let t = parseInt(item.time);
        var date = new Date(t);
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = date.getDate() + " ";
        item.time = Y + M + D;
        // console.log(item.time);
      });
      this.commentList = comments.data.hotComments;
      this.allNum = this.commentList.length;
    },
  },
  mounted() {
    this.musicId = this.$props.id;
    this.createList();
  },
};
</script>

<style lang="less" scoped>
.topNav {
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 0, 0);
  .allNum {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    color: white;
    .icon {
      margin-right: 0.2rem;
      fill: white;
    }
  }
  .icon {
    margin-right: 0.3rem;
  }
}
.comments {
  .comment {
    margin-top: .1rem;
    .top {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        justify-content: center;
        margin-left: 0.2rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin-top: 0.2rem;
          margin-left: 0.2rem;
        }
        .aboutUser {
          margin-top: .5rem;
          margin-left: .2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-weight: bold;
            font-size: 0.28rem;
          }
          .time {
            font-size: 0.2rem;
            color: rgb(160, 160, 160);
          }
        }
      }
      .right{
        margin-top:.5rem;
        margin-right: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .05rem;
        .liked{
            margin-top: .08rem;
            font-size: .2rem;
            margin-right: .08rem;
        }
        .icon{
            width: .4rem;
            height: .4rem;
        }
      }
    }
    .content{
        display: flex;
        justify-items: center;
        align-items: center;
        width: 6rem;
        margin-left: .8rem;
        margin-top: .2rem;
        font-size: .28rem;
        color: rgb(114, 114, 114);
    }
    .line {
      border: none;
      margin-top: .5rem;
      margin-bottom: .2rem;
      border-bottom: 0.01rem solid rgb(207, 207, 207);
    }
  }
}
</style>