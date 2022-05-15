<template>
  <div>
    <Head></Head>
    <Panel></Panel>
    <div class="p-50">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Panel from '@/components/home/Panel'

export default {
  name: 'home',
  components: {
    Head,
    Panel,
  },
  data() {
    return {}
  },
}
</script>

<style  scoped>
.p-50 {
  padding: 0 50px;
}
</style>