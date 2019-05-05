<template>
  <!-- 上有轮播图，下有九宫格;(v-for一般都是给dom元素加的，在这里，突然给组件加了，要给一个key) -->
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(img,index) in imgs" :key="index">
      <img :src="img.img || img.src" alt="没有获取到图片路径">
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  name: "my-swipe",
  props: ["url"],
  created() {
    this.$axios
      .get("this.url")
      .then(res => {
        // res.data.message = [{img:'图片地址'}]
        // 服务器数据格式： {"status":0,"message":[{"url":"","img":"http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181431411505.jpg"},
        // {"url":"","img":"http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181426524427.jpg"}]}
        this.imgs = res.data.message;
      })
      .catch(err => {
        console.log("首页或者商品详情轮播图获取异常", err);
      });
  },
  data() {
    return {
        imgs:[],//图片数据
    };
  }
};
</script>
<style scoped>
.mint-swipe {
  height: 200px;
}
img {
  width: 100%;
  height: 200px;
}
</style>
