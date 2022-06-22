<template>
  <div>
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li
          :class="{ 'layui-this': index === active }"
          v-for="(item, index) in tabs"
          :key="index"
          @click="toggleTab(item, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div style="width: 100%; overflow-x: hidden">
      <div
        class="layui-tab-container"
        :style="{
          transform: translateX,
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  components: {},
  props: {
    tabs: {
      type: Array,
      default() {
        return [{ name: "" }];
      },
    },
    onChange: {
      type: Function,
      default() {
        return () => {};
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    translateX() {
      let t = `translateX(-${100 * this.active}%)`;
      return t;
    },
  },
  methods: {
    toggleTab(item, i) {
      if (this.active != i) {
        this.onChange(item, i);
      }
      this.active = i;
    },
  },
  watch: {
    index: {
      immediate: true,
      handler(n, o) {
        if (n != o) {
          this.active = n;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.layui-tab-container {
  flex-wrap: nowrap;
  display: flex;
  transition: all 0.3s;
}
</style>