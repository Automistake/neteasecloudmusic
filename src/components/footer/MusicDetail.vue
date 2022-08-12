<template>
  <img :src="playList[playListIndex].al.picUrl" class="imagBackground" />
  <div class="detailNav">
    <div class="topLeft">
      <div class="leftSvg" @click="changeDetailShow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
    </div>
    <div class="aboutMusic">
      <div class="musicName">
        <Vue3Marquee> {{ playList[playListIndex].al.name }} </Vue3Marquee>
      </div>
      <div class="authName">
        <span v-for="(item, index) in playList[playListIndex].ar" :key="index">
          {{ item.name }}&nbsp;&nbsp;
        </span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow" @click="changeLrcShow">
    <img
      src="@/assets/needle.png"
      class="needle"
      :class="{ needle_active: !playStatus }"
    />
    <img src="@/assets/cd.png" class="cd" />
    <img
      :src="playList[playListIndex].al.picUrl"
      class="inCd"
      :class="{ inCd_active: !playStatus, inCd_paused: playStatus }"
    />
  </div>
  <div class="detailMusicLrc" v-show="isLyricShow" @click="changeLrcShow" ref="musicLyric">
    <div
      class="lyricRow"
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </div>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="changeCommentShow">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.1">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="lastMusic">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <div class="play">
        <svg v-if="playStatus" class="icon" aria-hidden="true" @click="detailPlay">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg
          v-if="!playStatus"
          class="icon"
          aria-hidden="true"
          @click="stopPlay"
        >
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
      <svg class="icon" aria-hidden="true" @click="nextMusic">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
  <van-popup
      v-model:show="commentShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
    <MusicComment
    :id="playList[playListIndex].id"
    />
    </van-popup>
</template>

<script>
import MusicComment from '@/components/footer/MusicComment.vue';
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  name:'MusicDetail',
  components: {
    Vue3Marquee,
    MusicComment,
  },
  props: ["play", "stopPlay","addDuration"],
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "playStatus",
      "detailShow",
      "lyrics",
      "currentTime",
      "duration",
      "commentShow",
    ]),
    lyric: function () {
      let arr;
      if (this.lyrics.lyric) {
        arr = this.lyrics.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,mill,lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i+1].time)) {
            item.pre = arr[i].time + 3000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log('这是arr',arr);
      return arr;
    },
  },
  mounted() {
    // this.addDuration()
    // console.log("这是获取到的相关数据：", this.playList, this.playListIndex);
  },
  methods: {
    ...mapMutations(["changeDetailShow","updateplayListIndex","changeCommentShow"]),
    changeLrcShow: function () {
      this.isLyricShow = !this.isLyricShow;
    },
    lastMusic:function(){
      if(this.playListIndex>0){
        this.updateplayListIndex(this.playListIndex-1)
      }
    },
    nextMusic:function(){
      if(this.playListIndex === this.playList.length-1){
        this.updateplayListIndex(0)
      }
      if(this.playListIndex<this.playList.length){
        this.updateplayListIndex(this.playListIndex+1)
      }
    },
    detailPlay:function(){
      this.play()
    },
  },
  watch:{
    currentTime:function(newValue){
      let p = document.querySelector("div.active")
      // console.log('这是获取到的激活歌词',[p]);
      if(p){
        if(Number.isInteger(p.offsetTop))
        {
          if(p.offsetTop>200){
          // console.log('是时候滚动窗口了',p.offsetTop);
            setTimeout(() => {
              this.$refs.musicLyric.scrollTop = (p.offsetTop-200)
            }, 0);
          }
      }
    }
    if(newValue === this.duration){
      this.nextMusic()
    }
  }
}}
</script>

<style lang="less">
.imagBackground {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  filter: blur(0.6rem);
}
.detailNav {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .topLeft {
    display: flex;
    .leftSvg {
      margin-right: 0.15rem;
      .icon {
        fill: #fff;
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
  .aboutMusic {
    padding: 0.1rem;
    .musicName {
      color: #fff;
    }
    .authName {
      color: rgb(160, 160, 160);
      font-size: 0.2rem;
      .icon {
        fill: rgb(160, 160, 160);
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 8.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-15deg);
    transition: all 2s;
  }
  .needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-1deg);
    transition: all 2s;
  }

  .cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .inCd {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_inCd 10s linear infinite;
  }
  .inCd_active {
    animation-play-state: running;
  }
  .inCd_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_inCd {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.detailMusicLrc {
  width: 100%;
  height: 8.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: scroll;
  .lyricRow {
    color: rgb(160, 160, 160);
    margin-top: 0.4rem;
  }
  .active {
    align-content: center;
    align-items: center;
    color: #fff;
    margin-top: 0.4rem;
    font-size: 0.4rem;
  }
}
.detailFooter {
  .footerTop {
    margin-top: .2rem;
    display: flex;
    justify-content: space-around;
    .icon {
      fill: #fff;
    }
  }
  .footerContent{
    margin-top: .3rem;
    margin-bottom: .5rem;
    .range{
      width: 100%;
      height: .6rem;
    }
  }
  .footer {
    display: flex;
    height: .2rem;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #fff;
    }
    .play {
      .icon {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
}
</style>