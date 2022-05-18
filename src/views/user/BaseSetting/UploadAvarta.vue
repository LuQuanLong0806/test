<template>
  <div class="upload d-flex">
    <div class="upload-container">
      <Upload :action="url" :on-success="uploadSuccess"></Upload>
      <span class="tips">上传图片格式为: .jpg .png .gif 且大小不超过5M!</span>
    </div>
    <img class="user-pic" :src="$store.state.login.userInfo.pic" alt="" />
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { getUserInfo } from '@/api/user'
export default {
  components: {
    Upload,
  },
  data() {
    return {
      pic: '',
      url: '/content/upload',
    }
  },
  methods: {
    uploadSuccess(res) {
      this.$pop(res.message, 'shake')
      let name = this.$store.state.login.userInfo.name
      // userInfo.pic = res.data

      getUserInfo({ name }).then((res) => {
        if (res.code == 200) {
          this.$store.commit('login/SET_USER_INFO', res.data)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.upload {
  margin: 30px;
}
.upload-container {
  margin-right: 40px;
}
.upload-img {
}
.upload-input {
  display: none !important;
}
.user-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.tips {
  font-size: 12px;
  color: #333;
  margin: 10px 0;
  display: block;
}
</style>