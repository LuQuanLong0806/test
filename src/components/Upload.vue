<template>
  <div>
    <label type="button" class="layui-btn upload-img">
      <i class="layui-icon layui-icon-upload-drag"></i>上传头像
      <input
        class="upload-input"
        type="file"
        name="file"
        accept="image/png, image/gif, image/jpg, image/webp"
        @change="upload"
      />
    </label>
  </div>
</template>

<script>
import axios from '@/api/request'

export default {
  props: {
    action: {
      type: String,
      default: '',
    },
    onSuccess: {
      type: Function,
      default() {
        return () => {}
      },
    },
    onError: {
      type: Function,
      default() {
        return () => {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    upload(e) {
      console.log('e~', e)
      let file = e.target.files

      let formData = new FormData()

      if (file.length > 0) {
        formData.append('file', file[0])
      }
      axios.post(this.action, formData).then((res) => {
        if (res.code == 200) {
          this.onSuccess(res)
        } else {
          this.onError(res)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-input {
  display: none !important;
}
</style>