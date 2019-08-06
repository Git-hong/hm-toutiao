<template>
  <div class="container">
    <div class="header">header</div>
    <div class="content">
      <!-- 默认插槽 -->
      <slot></slot>
    </div>
    <div class="footer">
      <slot>默认底部</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: 'my-test的数据'
    }
  }
}
</script>

<style scoped lang="less">
</style>
