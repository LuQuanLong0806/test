<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-border edit-content"
      v-show="isShow"
      ref="imgUpload"
    >
      <label class="layui-layer-title">添加代码</label>

      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <!-- <label class="layui-form-label">URL</label> -->

            <div class="layui-input-inline" style="width: 300px">
              <textarea
                type="text"
                id="fileInput"
                class="layui-input"
                placeholder="请输入链接地址"
                v-model="url"
                style="min-height: 150px"
              />
            </div>
          </li>
          <li class="layui-form-item" style="text-align: center">
            <label class="layui-btn" @click="submit">确定</label>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin">
        <a
          href="javascript:;"
          class="layui-layer-icon layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Code',
  props: {
    isShow: {
      type: Boolean,
      default: false,
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
    return {
      url: '',
    }
  },

  methods: {
    close() {
      this.url = ''
      this.$emit('on-close')
    },

    submit() {
      this.$emit('on-submit', this.url)
      this.close()
    },
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