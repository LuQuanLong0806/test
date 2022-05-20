<template>
  <transition name="fade">
    <div
      class="
        layui-layer layui-layer-tips layui-edit-face
        edit-content
        transform-origin
      "
      v-show="isShow"
    >
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in lists" :key="'face' + key">
            <img
              :title="key"
              :src="value"
              :alt="key"
              @click.stop="chooseFace(value)"
            />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { faces } from "@/assets/js/face.js";
export default {
  name: "Face",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    ctrl: {
      default: "",
    },
  },
  data() {
    return {
      lists: faces,
    };
  },
  mounted() {
    document
      .querySelector("body")
      .addEventListener("click", this.handleClickBody);
  },
  methods: {
    chooseFace(value) {
      this.$emit("on-face", value);
    },
    handleClickBody(e) {
      // 点击非icon组件之外的地方 隐藏内容
      if (!this.ctrl.contains(e.target)) {
        this.$emit("on-close");
      }
    },
  },

  beforeDestroy() {
    document
      .querySelector("body")
      .removeEventListener("click", this.handleClickBody);
  },
};
</script>

<style lang="scss" scoped>

</style>