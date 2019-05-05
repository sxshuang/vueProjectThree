// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 配置MintUI,必须放在最上边
import MintUI from 'mint-ui'
// 上边这种是把所有的都引入了，可以用哪个组件，单独引用一下，例如import spinner from 'mint-ui/lib/spinner',然后单独的use

// 引入css(这个路径在node_modules中)
import 'mint-ui/lib/style.css'
// 这个和上边引入js同理 import 'mint-ui/lib/spinner/style.css'

// 引入我们自己的css
import "./assets/css/global.css";


// 引入图标的css
import "./assets/ttf/iconfont.css";


// 引入自己的ul、li组件
import MyUl from '@/components/Common/MyUl';
import MyLi from '@/components/Common/MyLi';

// 注册全局组件
Vue.component(MyUl.name, MyUl);
Vue.component(MyLi.name, MyLi);
import NavBar from '@/components/Common/NavBar';
Vue.component(NavBar.name, NavBar);

import Comment from '@/components/Common/Comment.vue'
Vue.component(Comment.name, Comment);

// 引入首页和商品详情公用的全局轮播图组件
import MySwipe from '@/components/Common/MySwipe.vue';
Vue.component(MySwipe.name,MySwipe);

// 全剧组件 END


// 定义moment 全局日期过滤器
import Moment from 'moment';

// 设置中文显示
Moment.locale('zh-cn');
// {{ 'xxx' | convertTime('yyyy-mm-dd' )}}
// {{ 'xxx' | convertTime('yyyy 年 mm 月 dd 日' )}}
Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr);
});

Vue.filter('relativeTime', function (previousTime) {
  return Moment(previousTime).fromNow();
});

// 处理字符串过长的过滤器
Vue.filter('convertStr',function(str,count){
  return str.substring(0,count) + '...';
}) 


// 图片缩略图预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview); //这个用了，内部运行 Vue.component('vue-preview',componentObj)



/* 配置axios */
import Axios from 'axios'
// 配置公共URL
Axios.defaults.baseURL = 'http://www.sinya.online/api/'
Vue.prototype.$axios = Axios



// 这一块是加载，因为服务器那边数据没有图片，所以一直是加载，没法点其他的，先注释掉

// // 配置请求拦截器，显示loading图标
// Axios.interceptors.request.use(function (config) {
//   MintUI.Indicator.open({
//     text: '玩命加载中...'
//   });
//   return config;
// });
// // 配置响应拦截器，关闭loading图标
// Axios.interceptors.request.use(function (response) {
//   // response.config  类似上面的config
//   MintUI.Indicator.close();
//   return response;
// });




// 安装插件，其实就是注册全局组件及挂载属性
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
