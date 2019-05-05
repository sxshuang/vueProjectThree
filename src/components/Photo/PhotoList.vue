<template>
  <div>
    <nav-bar title="图文列表"></nav-bar>
    <!-- 引入返回导航 -->
    <div class="photo-header">
      <ul>
        <li v-for="c in categorys" :key="c.id">
          <a @click="loadImagesByCategoryId(c.id)" href="javascript:;">{{c.title}}</a>
        </li>
      </ul>
    </div>
    <!-- 下方图片 -->
    <div class="photo-list">
      <ul>
        <li v-for="img in imgs" :key="img.id">
          <!-- 关于value是否给单引号的问题：给了是字符串，不给是从vue获取数据 -->
          <router-link :to="{name:'photo.detail',query:{id:img.id}}">
            <img v-lazy="img.img_url">
            <p>
              <span>{{img.title}}</span>
              <br>
              <span>{{img.zhaiyao}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [], //这是图片数据
      categorys: [] //这是标题分类信息
    };
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`

    // 一句话：路由复用，但参数改变触发，
    // 参数指的是：query || params
    console.log(to);
    this.loadImgById(to.params.categoryId);
    next();
  },
  created() {
    // 1:获取路由参数 categoryId（这个不要，封装当参数传进去）
    let categoryId = this.$route.params.categoryId;
    this.loadImgById(categoryId);
    // 2:获取标题分类信息
    this.$axios
      .get("/getimgcategory")
      .then(res => {
        this.categorys = res.data.message;

        // 向数组的第一个元素添加一个 ‘全部’(unshift 向数组开头添加)
        this.categorys.unshift({
          id: 0,
          title: "全部"
        });
      })
      .catch(err => console.log("分类信息获取失败", err));
  },
  methods: {
    loadImagesByCategoryId(categoryId) {
      // 这几个函数调用顺序总结：这个操作会让锚点改变，参数改变，锚点改变就会 复用上边beforeRouteUpdate这个组件，触发这个函数，
      // 这个函数触发就会调用loadImgById,就单纯的获取id了，
      this.$router.push({
        name: "photo.list",
        params: { categoryId: categoryId }
      });
    },
    // 这个函数通过id获取数据
    loadImgById(id) {
      // 这个是封装的思想

      // 2：通过URL 拼接参数发请求
      this.$axios
        .get("getimages/" + id)
        .then(res => {
          this.imgs = res.data.message;

          //   判断是否imgs.length == 0；是的话，加载爬虫图标
          if (this.imgs.length === 0) {
            this.$toast({
              message: "没有图片了",
              iconClass: "iconfont icon-debug"
            });
          }
        })
        .catch(err => console.log("图片列表获取失败", err));
      // 3：获取数据做渲染
    }
  }
};
</script>


<style>
.photo-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
}
.photo-header ul {
  /* 强制不换行 */
  white-space: nowrap;
  overflow-x: auto;
  padding-left: 0px;
  margin: 5px;
}
/* 下面的图片 */
.photo-list li {
  list-style: none;
  position: relative;
}
.photo-list li img {
  width: 100%;
  height: 230px;
  vertical-align: top;
}
.photo-list ul {
  padding-left: 0px;
  margin: 0;
}
.photo-list p {
  position: absolute;
  bottom: 0px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
}
.photo-list p span:nth-child(1) {
  font-weight: bold;
  font-size: 16px;
}

/* 图片懒加载样式（引用mint-ui里的得v-lazy */
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>

