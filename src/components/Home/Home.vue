<template>
  <div>
    <!-- 上有轮播图，下有九宫格;(v-for一般都是给dom元素加的，在这里，突然给组件加了，要给一个key) -->
    <!-- 这个轮播图功能，在商品详情也有，所以封装成公共的轮播图组件 myswipe -->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img,index) in imgs" :key="index">
        <img :src="img.img || img.src" alt="没有获取到图片路径">
      </mt-swipe-item>
    </mt-swipe> -->

    <!-- 这是使用公共的轮播图 -->
    <my-swipe url="getlunbo"></my-swipe>

    <!-- 九宫格 -->
    <div class="grid">
      <my-ul>
        <my-li v-for="(grid,index) in grids" :key="index">
          <router-link :to="grid.router">
            <span :class="grid.className"></span>
            <span>{{grid.title}}</span>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: [], //轮播图数据
      grids: [
        {
          className: "cms-news",
          title: "新闻资讯",
          router: { name: "news.list" }
        },
        {
          className: "cms-photo",
          title: "图文分享",
          router: { name: "photo.list", params: { categoryId: 0 } }
        },
        {
          className: "cms-sp",
          title: "商品展示",
          router: { name: "goods.list", query: { id: 1 } }
        },
        {
          className: "cms-ly",
          title: "留言反馈",
          router: { name: "news.list" }
        },
        {
          className: "cms-zx",
          title: "搜索资讯",
          router: { name: "news.list" }
        },
        {
          className: "cms-lx",
          title: "联系我们",
          router: { name: "news.list" }
        }
      ]
    };
  },
  // created 创建组件的声明周期函数中，可以操作数据
  created() {
    // this.$axios
    //   .get("getlunbo")
    //   .then(res => {
    //     // res.data.message = [{img:'图片地址'}]
    //     // 服务器数据格式： {"status":0,"message":[{"url":"","img":"http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181431411505.jpg"},
    //     // {"url":"","img":"http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181426524427.jpg"}]}
    //     this.imgs = res.data.message;
    //     console.log(res.data.message);
    //   })
    //   .catch(err => console.log("轮播图获取异常", err));
  }
};
</script>

<style scoped>

/* 这样写，相当于全局,在style上加了scoped，相当于仅仅支队当前组件起作用 */
/* div {
  background-color: skyblue;
} */

/* 九宫格样式 */

.grid li a {
  text-decoration: none;
}
/* 九宫格里的图片 */
.cms-news,
.cms-photo,
.cms-sp,
.cms-ly,
.cms-zx,
.cms-lx {
  background-repeat: round;
  height: 55px;
  width: 55px;
  display: inline-block;
  margin: 10px 0;
  margin: 0 auto;
  display: block;
}

.cms-news {
  background-image: url("../../assets/img/news.png");
}
.cms-photo {
  background-image: url("../../assets/img/PicShare.png");
}
.cms-sp {
  background-image: url("../../assets/img/商品.png");
}
.cms-ly {
  background-image: url("../../assets/img/留言反馈.png");
}
.cms-zx {
  background-image: url("../../assets/img/搜索.png");
}
.cms-lx {
  background-image: url("../../assets/img/联系我们.png");
}
</style>
