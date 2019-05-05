<template>
  <div style="height:587px">
    <nav-bar title="商品展示"/>
    <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" ref="loadmore" :bottpm-all-loaded="isAllLoaded">
      <ul>
        <li v-for="goods in goodsList" :key="goods.id">
          <router-link :to="{name:'goods.detail',params:{id:goods.id}}">
            <img :src="goods.img_url">
            <div class="title">{{goods.title | convertStr(25)}}</div>
            <div class="desc">
              <div class="sel1">
                <span>￥{{goods.sell_price}}</span>
                <s>￥{{goods.market_price}}</s>
              </div>
              <div class="detail">
                <div class="hot">热卖中</div>
                <div class="count">剩余{{goods.stock_quantity}}件</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script>
// 网络图片 img src随便玩
// 本地静态图片避免跳坑：本地静态资源图片 ，告知webpack 帮助移动到未来的dist目录
// import ImgSrc from '../xxx.jpg';
// <img :src="ImgSrc" />>

export default {
  data() {
    return {
      goodsList: [], //商品列表数据
      page: 1, //页码
      isAllLoaded: false //全部数据是否加载完毕
    };
  },
  created() {
    let page = this.$route.query.id || "1";
    this.loadByPage(this.page);
  },
  methods: {
    loadByPage(page) {
      this.$axios
        .get("getgoods?pageindex=" + this.page)
        .then(res => {
          this.goodsList = res.data.message;
          this.page++;
        })
        .catch(err => console.log(err, "商品列表获取失败"));
    },
    concatByPage(page) {
      this.$axios
        .get("getgoods?pageindex=" + this.page)
        .then(res => {
          // 判断是否还有数据
          if (res.data.message === 0) {
              this.$toast('没有更多数据了');
            // Loadmore 的禁止函数调用的属性来控制
            this.isAllLoaded = true;
          }

          this.goodsList = this.goodsList.concat(res.data.message); //这个是追加
          this.$refs.loadmore.onBottomLoaded(); //通知元素重新定位
          this.page++;
        })
        .catch(err => console.log(err, "商品列表获取失败"));
    },
    loadBottom() {
      // 这个是通过下拉加载的话，调用 concatByPage() 这个函数
      this.concatByPage(this.page);
    }
  }
};
</script>
<style scoped>
ul {
  overflow: hidden;
}
li {
  width: 50%;
  float: left;
  padding: 6px;
  box-sizing: border-box;
}
li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #5c5c5c;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}
li > a:not(.mui-btn) img {
  width: 100%;
}
.sell > span {
  float: left;
  color: red;
  text-align: left;
}
.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}
.detail > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}
/* 撑开，去除浮动没有的高度 */
.detail {
  overflow: hidden;
}
.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}
img {
  height: 200px;
}
</style>

