<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name:'Scroll',
    props:{
      //监听scroll位置，
      probeType:{
        type:Number,
        default:0
      },
      //上拉加载更多
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      //１.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad,　//上拉加载更多
      })

      //２.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })

      // 3.监听上拉加载事件
      this.scroll.on('pullingUp',() => {
        // console.log("上拉加载更多")
        this.$emit('pullingUp')
      })

    },
    methods: {
      //回到顶部页面
      scrollTo(x,y,time) {
        //scroll.scrollTo方法
        // 参数1是x坐标轴,参数２是y坐标轴,参数３是用时毫秒
        this.scroll.scrollTo(x,y,time)
      },
      //上拉加载更多
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    },
    
  }
</script>

<style scoped>

</style>