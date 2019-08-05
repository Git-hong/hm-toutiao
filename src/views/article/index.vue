<template>
<div class="container">
    <!-- 筛选条件 -->
    <el-card>
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrum>首页</el-breadcrum>
                <el-breadcrum>内容管理</el-breadcrum>
            </el-breadcrumb>
        </div>
        <el-form>
            <el-form-item label=""></el-form-item>
            <el-form-item label="频道"></el-form-item>
            <el-form-item label="日期"></el-form-item>
        </el-form>
    </el-card>
    <!-- 筛选结果 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选项表单数据  提交给后台参数
      reqParams: {
        status: null
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
