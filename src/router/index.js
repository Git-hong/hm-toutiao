// 定义router对象 导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
// import NOtFound from '@/views/notfound'

Vue.use(VueRouter)
const router = new VueRouter({
  // 路由规则
  //   name给当前路由规则取别名  $router.push('/login')或者$router.push({name:'login'})
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
    // 处理404
    // { path: '*', name: '404', component: NOtFound }
  ]
})

// 前置导航守卫
// router.beforeEach((to, from, next) => {
//   // 判断是不是登录路由
//   if (to.path === '/login') return next()
//   // 2 判断是否登录
//   if (!StorageEvent.getUser().token) return next('/login')
//   // 3 放行
//   next()
// })

export default router
