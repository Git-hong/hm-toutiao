<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveUserInfo" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 头像上传 -->
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action=""
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        email: null,
        photo: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    myUpload (result) {
      //   axios + formdata 进行上传
      // 选中图片后 触发函数  选择的结果result
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步home组件
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    // 获取用户信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 保存用户信息
    async saveUserInfo () {
      // patch 请求类型做修改  局部修改
    //   put 请求类型做修改 完整修改
      await this.$http.patch('user/profile', {
        //   按照后台需要提交数据
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      //   当你刷新页面的时候  home组件使用的本地存储的数据  更新本地存储
      store.setUser({ name: this.userForm.name })
      //   更新home组件用户名
      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}
</script>

<style scoped lang="less">
</style>
