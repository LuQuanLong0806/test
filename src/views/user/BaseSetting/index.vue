<template>
  <div class="base-setting">
    <Tabs :tabs="tabList" :on-change="changeTab" :index="1">
      <TabItem>
        <MyInfo></MyInfo>
      </TabItem>
      <TabItem>
        <UploadAvarta></UploadAvarta>
      </TabItem>
      <TabItem> 密码 </TabItem>
      <TabItem> 账号绑定 </TabItem>
    </Tabs>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import TabItem from '@/components/Tabs/TabItem'

import MyInfo from './MyInfo.vue'
import UploadAvarta from './UploadAvarta.vue'

export default {
  name: 'base-setting',
  components: {
    Tabs,
    TabItem,
    MyInfo,
    UploadAvarta,
  },
  data() {
    return {
      tabList: [
        { name: '我的资料', value: 0 },
        { name: '头像', value: 1 },
        { name: '密码', value: 2 },
        { name: '账号绑定', value: 3 },
      ],
    }
  },
  methods: {
    changeTab(item, index) {
      console.log(item, index)
    },
  },
}
</script>

<style lang="scss" scoped>
.base-setting {
  background-color: #fff;
  padding: 20px;
}
</style>