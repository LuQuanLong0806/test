<template>
  <div>
    <Head></Head>
    <Panel></Panel>
    <router-view></router-view>

  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Panel from "@/components/home/Panel";


export default {
  name: "home",
  components: {
    Head,
    Panel,

  },
  data() {
    return {};
  },
};
</script>

<style  scoped>

</style>