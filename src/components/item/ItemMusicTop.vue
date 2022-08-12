<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" class="imagBig" />
    <div class="topLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>
  </div>
  <div class="itemMusicDetail">
    <img :src="playlist.coverImgUrl" class="imgMusicCover" />
    <div class="detailRight">
      <h3>{{ playlist.name }}</h3>
      <div class="creatorAbout">
        <img
          :src="playlist.creator.avatarUrl"
        />
        <span class="nickname">{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <div class="description">
        <span class="text">{{newPlaylist.description}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="quickButton">
    <div class="singleButton">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <span>{{this.newPlaylist.commentCount}}</span>
    </div>
    <div class="singleButton">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{this.newPlaylist.shareCount}}</span>
    </div>
    <div class="singleButton">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="singleButton">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemMusicTop",
  setup(props) {
    // console.log('这是获取到的playlist',props);
    // 如果无法读取数据，则获取sessionstorage中的state
    if(props.playlist.creator = ""){
      props.playlist.creator = JSON.parse(sessionStorage.getItem()).creator
      // console.log('这是页面从缓存获取到的playlist',props.playlist)
    }
  },
  props: ["playlist"],
  data() {
    return {
      newPlaylist:{}
    }
  },
  methods:{
    play(){
      this.newPlaylist.description = this.newPlaylist.description.substr(0,20)
      // console.log('成功改变参数，利用watch监听：',this.newPlaylist)
      // console.log('这是tracks的内容',this.newPlaylist.tracks)
    }
  },
  watch:{
    playlist:function(newplaylist,oldplaylist){
      this.newPlaylist = newplaylist
      this.play();
    }
  }
};
</script>

<style lang="less">
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .imagBig {
    width: 100%;
    height: 8rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
  .topLeft,
  .topRight {
    padding: 0.2rem;
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 0.4rem;
      color: white;
    }
    .icon {
      fill: white;
    }
  }
}
.itemMusicDetail {
  padding: 0.2rem;
  margin-top: 0.2rem;
  display: flex;
  color: white;
  .imgMusicCover {
    height: 40%;
    width: 40%;
    border-radius: 0.5rem;
  }
  .detailRight {
    padding: 0.2rem;
    font-size: 0.26rem;
    .creatorAbout,
    .description {
      display: flex;
      align-items: center;
      font-size: 0.16rem;
      color: rgb(175, 172, 172);
      img {
        margin-top: 0.26rem;
        margin-left: 0.2rem;
        margin-right: 0.1rem;
        margin-bottom: 0.26rem;
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 0.4rem;
      }
      .icon {
        fill: rgb(146, 143, 143);
        width: 0.22rem;
        height: 0.22rem;
      }
      .text{
        height: .64rem;
      }
    }
  }
}
.quickButton{
    display: flex;
    justify-items: center;
    justify-content: space-around;
    .singleButton{
        margin-top: .1rem;
        display: flex;
        flex-direction: column;
        font-size: .2rem;
        color: white;
        .icon{
            fill: white;
            margin-bottom: .1rem;
            width: .4rem;
            height: .4rem;
        }
    }
}
</style>