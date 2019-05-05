<template>
  <div>
    <nav-bar title="商品详情"></nav-bar>
    <div class="outer-swiper">
      <div class="swiper">
        <my-swipe url="getthumimages/87"></my-swipe>
      </div>
    </div>
    <div class="product-desc">
      <ul>
        <li>
          <span class="product-desc-span">{{goodsInfo.title}}</span>
        </li>
        <li class="price-li">
          市场价：
          <s>￥{{goodsInfo.market_price}}</s>
          销售价:
          <span>￥{{goodsInfo.sell_price}}</span>
        </li>
        <li class="number-li">
          购买数量：
          <span @click="substract">-</span>
          <span>{{pickNum}}</span>
          <span @click="add">+</span>
        </li>
        <li>
          <mt-button type="primary">立即购买</mt-button>
          <mt-button type="danger" @click="insertBall">加入购物车</mt-button>
        </li>
      </ul>
    </div>
    <!-- 这里的动画是，当点击的时候，把小球的DOM元素插入，然后做动画，做完要移除元素，
    因为不止点击一次，不移除的话，只做css的隐藏，vue过渡动画，在下一次点击的时候，
    因为已经存在元素，不会再插入就不会做动画，所以用vue过渡动画文档中的JavaScript钩子，进入之后做完就移除元素-->
    <transition name="ball" @after-enter="afterEnter">
      <!-- 这里用v-if是为了使用vue动画过渡 -->
      <div class="ball" v-if="isExist"></div>
    </transition>
    <div class="product-props">
      <ul>
        <li>商品参数</li>
        <li>商品货号：{{goodsInfo.goods_no}}</li>
        <li>库存情况：{{goodsInfo.stock_quantity}}件</li>
        <li>上架时间：{{goodsInfo.add_time|convertTime('YYYY-MM-DD')}}</li>
      </ul>
    </div>
    <div class="product-info">
      <ul>
        <li>
          <mt-button @click="showPhotoInfo" type="primary" size="large" plain>图文介绍</mt-button>
        </li>
        <li>
          <mt-button @click="goodsComment" type="danger" size="large" plain>商品评论</mt-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import EventBus from "@/EventBus";
import GoodsTools from "@/GoodsTools";

export default {
  data() {
    return {
      isExist: false, //小红球移除，点一下加入购物车小球做飞入动画
      goodsInfo: {}, //商品详情信息
      pickNum: 1 //加入购物车数量
    };
  },
  methods: {
    add() {
      if (this.goodsInfo.stock_quantity <= this.pickNum) {
        return;
      } else {
        this.pickNum++;
      }
    },
    substract() {
      if (this.pickNum <= 1) {
        return;
      } else {
        this.pickNum--;
      }
    },
    insertBall() {
      this.isExist = true;
    },
    afterEnter() {
      this.isExist = false; //小球插入元素，做完动画，为了多次点击做动画，必须移除

      // 通知 App 组件增加小球数量(购物数量),不加到insertBall函数，加到这的原因是，
      // 如果一点击添加购物车，小球还没做动画掉进购物车，购物车数量就增加，有点不合理
      EventBus.$emit("addShopcart", this.pickNum);

      // 添加到本地存储
      GoodsTools.add({
        id: this.goodsInfo.id,
        num: this.pickNum
      });
    },
    // 图文介绍
    showPhotoInfo() {
      // 编程导航（去哪里）
      this.$router.push({
        name: "photo.info", //photo.info
        query: {
          id: this.$route.params.id
        }
      });
    },
    // 显示商品评论
    goodsComment() {
      // 编程导航  goods.comment -> 使用评论子组件
      // 需要商品的id
      this.$router.push({
        name: "goods.comment",
        query: {
          id: this.$route.params.id
        }
      });
    }
  },
  created() {
    let imgid = this.$route.params.id;
    this.$axios
      .get("goods/getinfo/" + imgid)
      .then(res => {
        this.goodsInfo = res.data.message[0];
      })
      .catch(err => console.log(err, "商品详情异常"));
  }
};
</script>
<style scoped>
.ball-enter-active {
  animation: bounce-in 1s;
}
.ball-leave {
  /* 元素进入以后，透明度0，整个动画都看不见 */
  /* 如果在这个leave离开这一点时刻(在vue文档过渡动画那一整个图)，就是让元素移除前这一刻就是透明0，则小球在做完动画就不会闪一下 */
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140px, -50px, 0);
  }
  75% {
    transform: translate3d(160px, 0px, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}
.swiper {
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 95%;
  border-radius: 15px;
  overflow: hidden;
}
.outer-swiper,
.product-desc,
.product-info,
.product-props {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 3px;
}
/* 请ulpadding */
.product-desc ul,
.product-info ul,
.product-props ul {
  padding: 0;
}

.product-desc ul li,
.product-info ul li,
.product-props ul li {
  list-style: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}
.product-desc ul > :nth-child(1) span {
  color: blue;
  font-size: 22px;
  font-weight: blod;
}
.product-desc ul > :nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.product-desc ul,
.product-info ul,
.product-props ul {
  padding-left: 10px;
}
.price-li span {
  color: red;
  font-size: 25px;
}
.price-li s {
  margin-right: 16px;
}
/* 加减 */
.number-li span {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 25px;
}
/* 商品参数 */
.product-props ul > :nth-child(1) {
  text-align: left;
}
.product-props ul:not(:nth-child(1)) {
  margin-left: 40px;
}
.product-info ul {
  margin-bottom: 70px;
  padding: 0 5;
}
.number-li span {
  text-align: center;
}
.number-li > :nth-child(2) {
  width: 40px;
}
.ball {
  border-radius: 50%;
  background-color: red;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 440px;
  left: 120px;
  display: inline-block;
  z-index: 9999;
}
</style>



