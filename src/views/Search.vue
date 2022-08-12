<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="inputText">
      <input
        type="text"
        placeholder="起风了"
        v-model="searchKey"
        @keydown.enter="searchPlease"
      />
    </div>
  </div>
  <div class="searchHistory">
    <p>历史</p>
    <span v-for="item in keyWorldList" :key="item" @click="searchHis(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="deleteHis">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
      <div class="item" v-for="(track, i) in this.searchMusicList" :key="i">
        <div class="itemLeft" @click="addMusic(track)">
          <div class="leftSpan">{{ i + 1 }}</div>
          <div class="nameAuth">
            <span class="name">
              {{ track.name}}&nbsp;
            </span>
            <div class="Auth">
              <span v-for="(auth, index) in track.artists" :key="index">
                {{ auth.name }}&nbsp;&nbsp;    
              </span>
            </div>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="track.mvid !== 0">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-danlieliebiao"></use>
          </svg>
        </div>
      </div>
    </div>
</template>

<script>
import { getSearch } from "@/request/api/home.js";
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      keyWorldList: [],
      searchKey: "",
      searchMusicList:[],
      singleMusic:{},
    };
  },
  mounted() {
    this.keyWorldList =
      JSON.parse(sessionStorage.getItem("keyWorldList")) || [];
  },
  methods: {
    ...mapMutations(['pushPlayList']),
    searchPlease: async function () {
      if (this.searchKey !== "") {
        this.keyWorldList.unshift(this.searchKey);
        this.keyWorldList = [...new Set(this.keyWorldList)]; // 用set去重
        if (this.keyWorldList.length > 5) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        sessionStorage.setItem(
          "keyWorldList",
          JSON.stringify(this.keyWorldList)
        );
        // 访问过于频繁，接口被封，等待8.1完成
        let res = await getSearch(this.searchKey); // 获取对应的搜索结果
        this.searchMusicList = res.data.result.songs
        // console.log("这是获取到的res", res);
        // console.log('这是获取到的musicList',this.searchMusicList);
        this.searchKey = "";
      }
    },
    deleteHis: function () {
      this.keyWorldList = [];
      sessionStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
    },
    searchHis: async function(value){
        // 访问过于频繁，接口被封，等待8.1完成
        let res = await getSearch(value); // 获取对应的搜索结果
        this.searchMusicList = res.data.result.songs
        // console.log("这是获取到的res", res);
        // console.log('这是获取到的musicList',this.searchMusicList);
    },
    addMusic:function(track){
      // console.log(track);
      track.al = track.album
      track.al.picUrl=track.album.artist.img1v1Url
      track.ar = track.artists
      this.pushPlayList(track)
    }
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  padding: 0.3rem;
  height: 1rem;
  display: flex;
  align-items: center;
  .icon {
    fill: rgb(99, 97, 97);
  }
  .inputText {
    display: flex;
    input {
      margin-right: 0.1rem;
      width: 5.5rem;
      margin-left: 0.2rem;
      border: none;
      border-bottom: 0.01rem solid rgb(99, 97, 97);
      padding: 0.1rem;
    }
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  p {
    font-size: 0.3rem;
    font-weight: bold;
  }
  span {
    height: 0.5rem;
    padding: 0.03rem 0.2rem;
    background-color: rgb(195, 193, 193);
    border-radius: 0.4rem;
    margin: 0.1rem 0.15rem;
    display: inline-block;
    color: rgb(253, 231, 231);
  }
  .icon {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 2.5rem;
    right: 0.4rem;
  }
}
.itemList {
  margin-top: 2.5rem;
  margin-bottom: 1.3rem;
    .item {
      display: flex;
      justify-content: space-between;
      .itemLeft {
        padding: 0.1rem;
        display: flex;
        .leftSpan {
          padding: 0.2rem;
          font-size: 0.35rem;
          color: rgb(170, 167, 167);
        }
        .nameAuth {
          .name {
            font-weight: bolder;
            font-size: 0.28rem;
          }
          .Auth {
            font-size: 0.18rem;
            color: rgb(170, 167, 167);
          }
        }
      }
      .itemRight {
        padding: 0.3rem;
        .icon {
          margin-right: 0.1rem;
          fill: rgb(170, 167, 167);
        }
      }
    }
  }
</style>