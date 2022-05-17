<template>
  <div class="upload">
    <Upload :action="url" :on-success="uploadSuccess"></Upload>
    <img class="user-pic" :src="pic" alt="" />
  </div>
</template>

<script>
import Upload from '@/components/Upload'

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
      console.log(res)
      this.pic = 'http://localhost:9090' + res.data
    },
  },
}
</script>

<style lang="scss" scoped>
.upload {
  width: 520px;
  margin: 0 auto;
}
.upload-img {
}
.upload-input {
  display: none !important;
}
.user-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>