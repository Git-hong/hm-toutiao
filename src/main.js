// main.js 的职责
//  职责1：导入项目需要依赖的资源（js包，css文件 其他资源）
//  职责2：创建一个根实例

import Vue from 'vue'
import App from './App.vue'

// tip 提示信息  production 生成环境
Vue.config.productionTip = false // 按开发(详细一些)环境来提示

// 根实例
new Vue({
  render: h => h(App)
}).$mount('#app') // mount挂载
