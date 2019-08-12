// 存储信息的时候，
// 1 约定信息的key是什么    hm-toutiao
// 2 存储信息的值是什么      用户信息对象   字符串格式json
const KEY = 'hm-toutiao'
export default {
  setUser (user) {
    const localuser = this.getUser()
    // 存储用户信息到sessionStorage
    const nowUser = { ...localuser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(nowUser))
  },
  getUser () {
    // 获取用户信息从sessionStorage
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
