<template>
  <div class="tab-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tab-item",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.tab-item {
  width: 100%;
  flex-shrink: 0;
}
</style>