<template>
  <div>
    <nav-bar title="购物车"></nav-bar>

    <div class="pay-detail">
      <ul>
        <li class="p-list" v-for="(goods,index) in shopcart" :key="index">
          <mt-switch v-model="goods.isSelected"></mt-switch>
          <img :src="goods.thumb_path">
          <div class="pay-calc">
            <p>{{goods.title}}</p>
            <div class="calc">
              <span>￥{{goods.sell_price}}</span>
              <span @click="substract(goods)">-</span>
              <span>{{goods.num}}</span>
              <span @click="add(goods)">+</span>
              <a href="javascript:;" @click="del()">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费)：</p>
        <span>已经选择商品{{paymenet.count}}件，总价￥{{paymenet.price}}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsTools from "@/GoodsTools";

export default {
  // 计算属性
  computed: {
    paymenet() {
      let price = 0;
      let count = 0;
      this.shopcart.forEach(goods => {
        if (goods.isSelected) {
          count += goods.num;
          price += goods.num * goods.sell_price;
        }
      });
      return {
        count,
        price
      };
    }
  },

  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    //  可以访问组件实例 ‘this’
    if (confirm("亲，真的要离开吗？")) {
      // 确定要离开的话，保存当前剩余的购物车数据
      let obj = {};
      this.shopcart.forEach(goods => {
        obj[goods.myid] = goods.num;
      });
      GoodsTools.saveGoods(obj);
      // next(); 就是放行，相当于检查过可以走了，如果不放行，就会一直呆在这，页面不会跳转了
      next();
    } else {
      next(false); //取消导航行为
    }
  },
  methods: {
    add(goods) {
      // console.log("调用");
      goods.num++;
    },
    substract(goods) {
      goods.num--;
    },
    del(index) {
      this.shopcart.splice(index, 1);
    }
  },
  data() {
    return {
      shopcart: [] //购物车数据
    };
  },
  created() {
    let goodsList = GoodsTools.getGoodsList();
    let ids = Object.keys(goodsList).join(",");
    this.$axios
      .get("http://localhost:3000/getshopcarlist")
      .then(res => {
        // 给this.shopcart 添加属性
        res.data.forEach(goods => {
          // 判断是否有该商品
          if (goodsList[goods.myid]) {
            goods.num = goodsList[goods.myid];
          }
          // 不管有没有都需要打勾(按钮选择中)
          goods.isSelected = true;
        });
        // 坑点：先丰富好对象的属性，一次性赋值，有效(就是当前写法顺序)

        this.shopcart = res.data;
        //解释：Object.defineProPerty(this,'shopcart',{
        //       set:function(resData){
        //        遍历resData的所有属性，并未shopcart的元素，逐个添加这些属性，并设置其set，遍历并监视其所有属性的set
        //      }
        //    })

        // 容易跳的坑：把上边 forEach 写在，this.shopcart = res.data;下边，是在私自给shopcart元素的加属性，无效，页面点击点击+，-不管用
      })
      .catch(err => console.log("购物车数据异常", err));
  }
};
</script>
<style scoped>
.pay-detail ul li {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 3px;
}
.pay-detail ul {
  padding-left: 5px;
  margin-top: 5px;
}
.pay-detail ul li img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
}
.pay-calc p {
  display: inline-block;
  width: 250px;
  overflow: hidden;
  color: blue;
  font-size: 15px;
  margin-bottom: 10px;
}

.pay-detail ul li > :nth-child(1) {
  line-height: 80px;
}
.calc:nth-child(1) {
  color: red;
  font-size: 20px;
}
.calc span:not(:nth-child(1)) {
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: inline-block;
  width: 20px;
  text-align: center;
}
.calc a {
  margin-left: 20px;
}
.show-1,
.show-2 {
  display: inline-block;
}
.show-1,
.show-2 {
  margin-left: 30px;
}
.show-price {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
