<template>
  <div class="home">
    <top-nav/>
    <swiper-top/>
    <icon-list/>
    <music-list/>
  </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue'
import SwiperTop from '@/components/home/SwiperTop.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
export default {
  components: { TopNav, SwiperTop, IconList, MusicList },
  name: 'HomeView',
}
</script>
