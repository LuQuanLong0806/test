<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-border edit-content"
      v-show="isShow"
      ref="imgUpload"
    >
      <label class="layui-layer-title">插入图片</label>

      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                class="layui-input"
                placeholder="粘贴图片地址或者点击上传"
              />
            </div>

            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload-drag"></i>上传图片
              </label>
            </button>
            <input type="text" id="uploadImg" class="layui-upload-file" />
          </li>
          <li class="layui-form-item" style="text-align: center">
            <button class="layui-btn">确定</button>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { faces } from '@/assets/js/face.js'
export default {
  name: 'Face',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    ctrl: {
      default: '',
    },
  },
  data() {
    return {
      lists: faces,
    }
  },
  mounted() {
    document
      .querySelector('body')
      .addEventListener('click', this.handleClickBody)
  },
  methods: {
    chooseFace(value) {
      this.$emit('on-face', value)
    },
    handleClickBody(e) {
      // 点击非icon组件之外的地方 隐藏内容
      if (
        !this.ctrl.contains(e.target) &&
        !this.$refs.imgUpload.contains(e.target)
      ) {
        this.$emit('on-close')
      }
    },
  },

  beforeDestroy() {
    document
      .querySelector('body')
      .removeEventListener('click', this.handleClickBody)
  },
}
</script>

<style lang="scss" scoped>
.layui-form-pane {
  margin: 20px;
}
.layui-layer-title {
  display: block;
}
</style>