<template>
  <div class="layui-row">
    <div class="layui-col-md8 p-10">
      <Ads></Ads>
      <HotList class="m-top-10"></HotList>
    </div>
    <div class="layui-col-md4 p-10">
      <!-- 温馨通道 -->
      <Links></Links>
      <!-- 签到 -->
      <Sign class="m-top-10"></Sign>
      <!-- 本周热议 -->
      <Tips class="m-top-10"></Tips>
    </div>
  </div>
</template>

<script>
import HotList from "@/components/home/siderbar/HotList";
import Ads from "@/components/home/siderbar/Ads";
import Links from "@/components/home/siderbar/Links";
import Sign from "@/components/home/siderbar/Sign";
import Tips from "@/components/home/siderbar/Tips";
export default {
  components: {
    Ads,
    HotList,
    Sign,
    Tips,
    Links,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.m-top-10 {
  margin-top: 20px;
}
.m-r-10 {
  margin-right: 10px;
}
.p-10 {
  padding: 20px 10px;
}

</style>