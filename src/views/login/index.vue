<template>
  <div class="bgc">
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
.bgc{
    background-color: #fff;
}
</style>