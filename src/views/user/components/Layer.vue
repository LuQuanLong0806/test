<template>
  <div>
    <div class="modal" v-if="isShow">
      <div class="mask" @click="close"></div>
      <div
        class="layui-layer"
        :class="{ active: isShow }"
        :style="{ ...customStyle }"
      >
        <div class="layui-layer-title">
          {{ title }}
          <i class="layui-icon layui-icon-close pull-right" @click="close"></i>
        </div>
        <div class="layui-layer-content">
          <slot></slot>
        </div>
        <div>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number || String,
      default: 320,
    },
    height: {
      type: Number || String,
      default: 480,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    isShow() {
      return this.value
    },
    customStyle() {
      let width = this.width
      let height = this.height
      let style = {
        width: width + 'px',
        height: height + 'px',
        marginLeft: -width / 2 + 'px',
        marginTop: -height / 2 + 'px',
      }
      return style
    },
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}
.font-orange {
  color: orangered;
}

.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  background-color: #fff;
  z-index: 2001;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  &-title {
    height: 38px;
    line-height: 38px;
    margin-bottom: 10px;
    background-color: #fafafa;
    padding: 0 20px;
    .pull-right {
      float: right;
      cursor: pointer;
    }
  }
  &-content {
    padding: 0 20px;
  }
}
</style>