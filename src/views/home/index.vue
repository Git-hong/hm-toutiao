<template>
  <el-container class="wrapper">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
//标签的名称其实就是解析后标签的类名
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 30px;
      vertical-align:middle;
      .text {
          vertical-align:middle;
      }
    }
  }
}
</style>
