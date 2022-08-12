<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="changeDetailShow">
      <img
        :src="this.playList[playListIndex].al.picUrl"
        class="inCd"
        :class="{ inCd_active: !playStatus, inCd_paused: playStatus }"
      />
      <div class="leftDetail">
        <div class="musicName">{{ this.playList[playListIndex].name }}</div>
        <span>横滑可以切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg v-if="playStatus" class="icon" aria-hidden="true" @click="play()">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <div class="stopPlay">
        <svg
          v-if="!playStatus"
          class="icon"
          aria-hidden="true"
          @click="stopPlay()"
        >
          <use xlink:href="#icon-zanting2"></use>
        </svg>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :play="play"
        :stopPlay="stopPlay"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MusicDetail from "./MusicDetail.vue";
export default {
  components: { MusicDetail },
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "playStatus", "detailShow"]),
  },
  methods: {
    ...mapMutations([
      "updateplayStatus",
      "changeDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
    play: function () {
      this.$refs.audio.play();
      this.updateplayStatus(false);
      this.updateTime(); // 播放时调用函数监听时间变化
    },
    stopPlay: function () {
      this.$refs.audio.pause();
      this.updateplayStatus(true);
      clearInterval(this.interVal); // 暂停时清除定时器
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 10);
    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
  },
  mounted() {
    // console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  watch: {
    playListIndex: function () {
      this.updateplayStatus(false);
      this.$refs.audio.autoplay = true;
      this.updateTime();
      // this.updateplayStatus(false)
    },
    playList: function () {
      if (this.playStatus) {
        this.updateplayStatus(false);
        this.$refs.audio.autoplay = true;
        this.updateTime();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 0.001px solid rgb(160, 160, 160);
  display: flex;
  justify-content: space-between;
  .footerLeft {
    display: flex;
    .inCd {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
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
    img {
      margin: 0.15rem 0.2rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .leftDetail {
      display: flex;
      flex-direction: column;
      margin-left: 0.1rem;
      .musicName {
        margin-top: 0.25rem;
        font-weight: bold;
      }
      span {
        margin-top: 0.08rem;
        font-size: 0.2rem;
        color: rgb(160, 160, 160);
      }
    }
  }
  .footerRight {
    margin: 0.3rem 0.3rem;
    display: flex;
    .icon {
      margin-left: 0.2rem;
      width: 0.6rem;
      height: 0.6rem;
    }
    .stopPlay {
      margin-top: 0.05rem;
      .icon {
        margin-left: 0;
        width: 0.55rem;
        height: 0.55rem;
      }
    }
  }
}
</style>
