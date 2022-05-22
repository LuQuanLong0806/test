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
              @click.stop="chooseFace(value, key)"
            />
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
  },
  data() {
    return {
      lists: faces,
    }
  },

  methods: {
    chooseFace(value, key) {
      console.log(value, key)
      let item = {
        value,
        key,
      }
      this.$emit('on-face', item)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>