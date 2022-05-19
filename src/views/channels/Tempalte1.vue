<template>
  <div>
    <Panel></Panel>
    <router-view></router-view>

  </div>
</template>

<script>
import Panel from "@/components/home/Panel";


export default {
  name: "home",
  components: {
    Panel,

  },
  data() {
    return {};
  },
};
</script>

<style  scoped>

</style>