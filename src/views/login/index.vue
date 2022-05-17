<template>
  <div>
    <Head></Head>
    <router-view></router-view>
  </div>
</template>

<script>
import Head from '@/components/Head'
export default {
  components: {
    Head,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
</style>