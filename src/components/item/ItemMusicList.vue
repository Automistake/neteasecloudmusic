<template>
  <div class="itemMusicList">
    <div class="nav">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="sub">
          <span class="playAll" @click="playMusic(0)">播放全部</span>
          <span class="countTrackIds">（共{{ countTrackIds }}首）</span>
        </div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <div class="sub">收藏（{{ changeCount(subscribedCount) }}）</div>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(track, i) in this.tracks" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <div class="leftSpan">{{ i + 1 }}</div>
          <div class="nameAuth">
            <span class="name">
              {{ track.name}}&nbsp;
            </span>
            <div class="Auth">
              <span v-for="(auth, index) in track.ar" :key="index">
                {{ auth.name }}&nbsp;&nbsp;    
              </span>
            </div>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="track.mv !== 0">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-danlieliebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "ItemMusicList",
  setup(props) {
    // console.log('这是获取到的playlist',props);
    // 如果无法读取数据，则获取sessionstorage中的state
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(sessionStorage.getItem()).creator;
      console.log("这是页面从缓存获取到的playlist", props.playlist);
    }
  },
  props: ["playlist"],
  data() {
    return {
      newPlaylist: {},
      countTrackIds: "",
      subscribedCount: "",
      tracks: {},
    };
  },
  methods: {
    play() {
      // this.newPlaylist.description = this.newPlaylist.description.substr(0,20)
      // console.log("成功改变参数，利用watch监听：", this.newPlaylist);
      // console.log("这是tracks的内容", this.newPlaylist.tracks);
      // console.log('这是trackIds的内容',this.newPlaylist.trackIds)
      // console.log('这是trackIds的长度',this.newPlaylist.trackIds.length)
      this.countTrackIds = this.newPlaylist.trackIds.length;
      this.subscribedCount = this.newPlaylist.subscribedCount;
      this.tracks = this.newPlaylist.tracks;
      // console.log("这是tracks", this.tracks);
    },
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
    playMusic:function(value){
      this.updateplayListIndex(value)
      this.updateplayList(this.newPlaylist.tracks)
    },
    ...mapMutations(['updateplayList','updateplayListIndex'])
  },
  watch: {
    playlist: function (newplaylist, oldplaylist) {
      this.newPlaylist = newplaylist;
      this.play();
    },
  },
};
</script>

<style lang="less">
.itemMusicList {
  margin-top: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background: color(white);
  .nav {
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    .left {
      align-content: center;
      display: flex;
      width: 50%;
      .icon {
        margin: 0 0.1rem;
      }
      .countTrackIds {
        font-size: 5px;
        color: grey;
      }
      .playAll {
        font-weight: bolder;
      }
    }
    .right {
      width: 45%;
      height: 60%;
      border-radius: 0.5rem;
      background: color(red);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: .4rem;
        height: .4rem;
        fill: white;
      }
      .sub {
        font-size: .3rem;
        padding: .11rem;
        color: white;
      }
    }
  }
  .itemList {
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
}
</style>