import Vue from 'vue'
import Router from 'vue-router'

// 引入四个组件
import Home from '@/components/Home/Home.vue'
import Member from '@/components/Member/Member.vue'
import Search from '@/components/Search/Search.vue'
import Shopcart from '@/components/Shopcart/Shopcart.vue'

// 引入NewsList组件
import NewsList from '@/components/News/NewsList.vue'
// 引入进入第一个新闻详情的组件
import NewsDetail from '@/components/News/NewsDetail.vue'
// 引入图片列表组件
import PhotoList from '@/components/Photo/PhotoList.vue'
// 引入图片描述组件
import PhotoDetail from '@/components/Photo/PhotoDetail.vue'
// 引入商品列表组件
import GoodsList from '@/components/Goods/GoodsList.vue'
// 引入商品详情组件
import GoodsDetail from '@/components/Goods/GoodsDetail.vue'
// 引入商品评论组件
import GoodsComment from '@/components/Goods/GoodsComment.vue'

// 注册全局组件 router-view router-link
// 未来所有的组件的this对象，就具备该属性，所有的this 其实就是Vue的子类对象
Vue.use(Router)

export default new Router({
  routes: [{
      // 首先进行重定向的操作（就是一打开项目就显示首页）
      path: '/',
      redirect: {
        name: 'home'
      },
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    // 配置新闻咨询列表
    {
      name: 'news.list',
      path: '/news/list',
      component: NewsList
    },
    // 配置新闻详情
    {
      name: 'news.detail',
      path: '/news/detail',
      component: NewsDetail
    },
    // 配置图文列表
    {
      name: 'photo.list',
      path: '/photo/list/:categoryId',
      component: PhotoList
    },
    //配置图文详情 
    {
      name: 'photo.detail',
      path: '/photo/detail',
      component: PhotoDetail
    },
    // 商品列表
    {
      name: 'goods.list',
      path: '/goods/list',
      component: GoodsList
    },
    // 商品详情
    {
      name: 'goods.detail',
      path: '/goods/detail/:id',
      component: GoodsDetail
    },
    // 商品的图文介绍
    {
      name: 'photo.info',
      path: '/goods/photo/info',
      component: NewsDetail
    },
    // 商品评论组件
    {
      name:'goods.comment',
      path:'/goods/comment',
      component:GoodsComment
    }
  ]
})
