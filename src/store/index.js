import { getPhoneLogin } from '@/request/api/home';
import { getMusicLyric } from '@/request/api/item';
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{
      al: {
        id: 147601346,
        name: "不问月",
        pic: 109951167624126270,
        picUrl: "http://p4.music.126.net/pmvK9NGQnXU7pYXzW_QvAQ==/109951167624126265.jpg",
        pic_str: "109951167624126265",
      },
      id: 1961297722,
      name: "不问月",
      ar: [
        {
          id: 36080656,
          name: "刘思雨"
        },
        {
          id: 35517812,
          name: "国风物语"
        }
      ],
    }],
    lyrics:{},  // 歌词的获取
    playListIndex: 0,  //当前列表的第n个，下标
    playStatus: true,  //当前歌曲是否播放中，true为暂停（初始的暂停）
    detailShow: false,//歌曲详情页面的显示和底部缩小栏的切换
    currentTime: 0, // 歌曲播放时间的
    duration:0,
    isLogin:false,
    isFooterMusic:true,
    commentShow:false,
  },
  getters: {
  },
  mutations: {
    updateplayStatus: function (state, value) {
      state.playStatus = value
    },
    updateplayList: function (state, newplayList) {
      state.playList = newplayList
      state.currentTime = 0
      // console.log('这是改变过后的playlist的值：', state.playList);
    },
    updateplayListIndex(state, value) {
      state.playListIndex = value
      state.currentTime = 0
    },
    changeDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    changeCommentShow:function(state){
      state.commentShow = !state.commentShow
    },
    updateLyric:function(state,value){
      state.lyrics = value
      // console.log('state中的歌词改变了',state.lyrics);
    },
    updateCurrentTime:function(state,value){
      state.currentTime = value
      // console.log('currentTime成功改变了：',state.currentTime);
    },
    updateDuration:function(state,value){
      state.duration = value
    },
    updateIsLogin:function(state,value){
      state.isLogin = value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
      state.playListIndex = state.playList.length-1
      // console.log('这是改变后的playList:',state.playList);
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      context.commit("updateLyric",res.data.lrc)
    },
    getLogin:async function(context,value){
      let res = await getPhoneLogin(value)
      // console.log('这是store中的登录信息获取',res);
    }
  },
  modules: { 
  }
})
