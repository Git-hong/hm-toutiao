// 配置一个axios 导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBig from 'json-bigint'
// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [
  (data) => {
    // data 此时是后端的原始数据
    // data 后台如果没有返回数据  值null
    // JSONBig.parse(null) 报错  阻止程序运行
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]
// 只会执行一次
// axios.defaults.headers = { Authorization: `Bearer ${store.getUser().token}` }

// 在每次请求之前，获取token信息，追加在headers中
// 请求拦截器：在每次请求前   做某一些事情
axios.interceptors.request.use((config) => {
  // 修改config
  config.headers = { Authorization: `Bearer ${store.getUser().token}` }
  return config
  // 错误处理
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器：在每次响应后   做某一些事情
axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  // 获取响应状态码 err对象包含响应对象 err.response
  if (err.response.status === 401) {
    // 跳转到登录页面    this.$router.push('/login')其实就是地址栏改成 #/login
    // 方式： 1 location.hash='#/login'      2 此时没有 vue实例，$router对象获取不到
    router.push('/login')
  }
  return Promise.reject(err)
})

// 进行导出
export default axios
