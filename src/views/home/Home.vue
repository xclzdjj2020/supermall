<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import {getHomeMultidata} from 'network/home'
  

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners:[],
        recommends:[]
      }
    },
    created() {
      getHomeMultidata().then(res => {
        // console.log(res)
        //请求的数据保存到数组中
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    /* 背景颜色 */
    background-color: var(--color-tint);
    color:white
  }
</style>
