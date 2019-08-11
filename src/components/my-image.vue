<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn">
      <img :src="value||defaultImage" @click="openDialog" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" @change="collectChange" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 渲染图片数据 -->
          <div class="img-list">
            <div
              :class="{selected:selectedImageUrl===item.url}"
              class="img-item"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="newPager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 对话框的打开方式
      dialogVisible: false,
      // 控制选中的选项卡  选项卡name的值
      activeName: 'image',
      // 传递参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表数据
      images: [],
      total: 0,
      // 记录选中的图片地址
      selectedImageUrl: null,
      // 上传头部
      uploadHeaders: { Authorization: `Bearer ${store.getUser().token}` },
      // 记录上传的图片地址
      uploadImageUrl: null,
      // 封面图片地址
      // value: defaultImage
      defaultImage
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      // 让图片按钮能够显示你选中的或者上传的图片地址
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadImageUrl)
        // this.value = this.uploadImageUrl
      }
      this.dialogVisible = false
    },
    // 成功上传图片
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
    // 选中的图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 分页功能
    newPager (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    // 切换收藏
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      // 清空之前选中或者上传的图片地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      // 获取素材列表数据
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.my-image {
  display: inline-block;
  margin-right: 30px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  display: block;
  text-align: center;
}
.img-list {
  margin-top: 10px;
  .img-item {
    position: relative;
    width: 140px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 22px;
    margin-bottom: 10px;
    // 选中样式
    &.selected {
      &::after {
        //img-item.selected::after
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center/50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: center;
    }
  }
}
</style>
