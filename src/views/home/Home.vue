<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!-- probe-type属性表示监听滚动条位置的类型 -->
    <!-- pull-up-load是否显示上拉加载 -->
    <!-- @scroll自定义事件，子组件传过来的是滚动条的位置 -->
    <!-- @pullingUp自定义事件，子组件传过来的上拉加载更多事件 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll ="contentScroll"　
            :pull-up-load="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"　
                    :titles="['流行','新款','精选']"
                    @tabClick = "tabClick" />
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  //引入公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/tabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  //引入方法
  import { getHomeMultidata,getHomeGoods } from 'network/home'

  

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners:[],
        recommends:[],
        //首页商品展示数据
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType:'pop',
        isShowBackTop:false,
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },


    //created里最好只写主要逻辑，主要调用哪些方法，具体方法实现过程放到methods里写
    created() {
      //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /*
        事件监听相关
      */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      },
      //点击右下角向上箭头，返回最上面
      backClick() {
        //拿到scroll的组件对象，调用scrollTo方法
        this.$refs.scroll.scrollTo(0,0,500)
      },
      //滚动条位置
      contentScroll(position) {
        //滚动条滚动距离大于600,回到顶部图标出现
        this.isShowBackTop = -position.y > 600
      },
      //上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
     
     
     /*
        网格请求相关
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // console.log(res)
        //请求的数据保存到数组中
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        //每次请求+1
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          //res得到的是数组，利用...语法解构数组
          //把每项数据都push到goods[type].list数组里
          this.goods[type].list.push(...res.data.list)
          //多一组数据，当前页码+1
          this.goods[type].page += 1
          
          //多次加载
          this.$refs.scroll.finishPullUp()
        })
      }
    },
  }

</script>

<style scoped>
  #home {
    padding-top: 44px;

    /* 100%视口 */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    /* 背景颜色 */
    background-color: var(--color-tint);
    color:white;
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index:9
  }

  .tab-control {
    position: sticky;
    top:44px;
    z-index:9
  }

  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top:44px;
    bottom:49px;
    left: 0;
    right: 0;
  }

  
</style>
