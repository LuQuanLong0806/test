<template>
  <div class="tab-item">
    <slot></slot>
    <!-- 
    <slot name="test" item="11111111111">
      <div>美妞</div>
    </slot> 
    <template #test="{ item: iii }">
        {{ iii }}
    </template> 
    -->
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