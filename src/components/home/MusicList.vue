<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="findMore">发现更多</div>
    </div>
    <div class="swipeChange">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(music, id) in musicList" :key="id">
          <router-link :to="{path:'/itemMusic',query:{id:music.id}}">
            <img :src="music.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-play"></use>
              </svg>
              {{ changeCount(music.playCount) }}
            </span>
            <div class="musicName">{{ music.name }}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
export default {
  name: "MusicList",
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getGedan() {
      let res = await getMusicList();
      // console.log(res);
      this.musicList = res.data.result;
    },
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
  mounted() {
    this.getGedan();
  },
};
</script>

<style lang="less">
.musicList {
  width: 100%;
  height: 4rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .findMore {
      border: 0.02rem solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .swipeChange {
    width: 100%;
    height: 4rem;
    .my-swipe {
      height: 100%;
      justify-items: center;
      img {
        width: 90%;
        height: 2.7rem;
        border-radius: 0.3rem;
      }
      .playCount {
        position: absolute;
        right: 0.4rem;
        top: 0.1rem;
        color: white;
        .icon {
          fill: white;
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .musicName {
        width: 90%;
        font-size: 0.1rem;
        color: black;
      }
    }
  }
}
</style>