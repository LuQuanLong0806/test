<template>
  <div>
    <Panel></Panel>
    <router-view></router-view>
    <Ads></Ads>
    <HotList></HotList>
    <Links></Links>
    <Sign></Sign>
    <Tips></Tips>
  </div>
</template>

<script>
import Panel from '@/components/home/Panel'
import HotList from '@/components/home/siderbar/HotList'
import Ads from '@/components/home/siderbar/Ads'
import Links from '@/components/home/siderbar/Links'
import Sign from '@/components/home/siderbar/Sign'
import Tips from '@/components/home/siderbar/Tips'

export default {
  name: 'home',
  components: {
    Panel,
    Ads,
    HotList,
    Sign,
    Tips,
    Links,
  },
  data() {
    return {}
  },
}
</script>

<style  scoped>
</style>