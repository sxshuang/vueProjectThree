<template>
  <div>
    <nav-bar title="图文详情"></nav-bar>
    <div class="photo-title">
      <p>{{info.title}}</p>
      <span>发起日期：{{info.add_time | convertTime('YYYY-MM-DD')}}</span>
      <span>{{info.click}}次预览</span>
      <span>分类:民生经济</span>
    </div>
    <!-- <ul> -->
    <!-- 这个安装并 使用了vue-preview 缩略图 组件，所以就不用绑定下边那个for循环li了 -->
    <!-- <vue-preview :slides="imgs"></vue-preview> -->
    <!-- <li v-for="(img,index) in imgs" :key="index">
        <img :src="img.src" alt="可能数据库中没有图片....">
    </li>-->
    <!-- </ul> -->
    <vue-preview :slides="imgs"></vue-preview>

    <div class="photo-desc">
      <p v-html="info.content"></p>
    </div>

    <!-- 使用评论组件 -->
    <comment :cid="$route.query.id"></comment>

  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}, //声明一下这个 图文详情数据 对象
      imgs: [] //声明一下这个 缩略图数组
    };
  },
  created() {
    // 获取当前URL的id
    let id = this.$route.query.id;
    // 发起请求：1.获取详情
    this.$axios
      .get("getimageInfo/" + id)
      .then(res => {
        // 由于后台返回的数据结构是一个数组，为了方便直接取0，并且数据库结构是一致的
        this.info = res.data.message[0];
      })
      .catch(err => console.log("图片详情获取失败", err));
    //   发起请求：2.获取缩略图
    this.$axios
      .get("getthumimages/" + id)
      .then(res => {
        this.imgs = res.data.message;

        // 这个是vue-preview 缩略图组件 的文档模板
        this.imgs.forEach(img => {
          img.msrc = img.src;
          img.w = 600;
          img.h = 400;
          img.alt = "可能没有图片...";
        });
      })
      .catch(err => console.log("图片缩略图获取失败！", err));
  }
};
</script>
<style scoped>
li {
  list-style: none;
}
ul {
  margin: 0px;
  padding: 0px;
}
.photo-title {
  overflow: hidden;
}
.photo-title,
.photo-desc {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}
.photo-title p {
  color: #13c2f7;
  font-size: 20px;
  font-weight: bold;
}
.photo-title span {
  margin-right: 20px;
}
.photo-desc p {
  font-size: 18px;
}
/* .my-gallery img {
  height: 123px;
  width: 123px;
} */
</style>


