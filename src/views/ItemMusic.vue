<template>
  <div>
    <ItemMusicTop :playlist="state.playlist" />
    <ItemMusicList :playlist="state.playlist"/>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import { getMusicItemList,getMusicInList, getMusicComment } from "../request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
export default {
  name: "ItemMusic",
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
  setup() {
    const state = reactive({
      playlist: {}, 
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      state.playlist = res.data.playlist;
      // 页面数据丢失用缓存来解决，seissionstorage解决
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
      // 尝试获取tracks中的第一首歌曲的评论信息
      let comments = await getMusicComment(state.playlist.tracks[0].id)
      // console.log('这是从歌单中获取到的第一首歌评论',comments);
    });
    return { state };
  },
};
</script>

<style>
</style>