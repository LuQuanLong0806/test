<template>
  <div id="app">
    <!-- <LoginVuelidate></LoginVuelidate> -->
    <!-- <LoginVeeValidate></LoginVeeValidate> -->
    <Head></Head>
    <div class="roter-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import LoginVuelidate from "@/components/LoginVuelidate";
// import LoginVeeValidate from '@/components/LoginVeeValidate'
import Head from "@/components/Head";

export default {
  name: "App",
  components: {
    Head,
    // LoginVuelidate,
    // LoginVeeValidate,
  },
  data() {
    return {};
  },
  validations: {},
  created() {},
  methods: {},
};
</script>

<style  lang="scss">
@import "./assets/css/global.css";
@import "./assets/css/layui-layer/layer.css";
// layui 样式属性
.layui-btn {
  background-color: var(--theme-color);
}

.layui-this {
  color: var(--theme-color);
}

.layui-nav-tree .layui-this {
  background-color: var(--theme-color);
  color: #fff;
}
.iconfont {
  font-family: "layui-icon-fly" !important;
}
html body {
  margin: 0;
}
.d-flex {
  display: flex;
  align-items: center;
  &-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.font-orange {
  color: orangered;
}

.font-gray {
  color: #c2c2c2;
}
.font-hide {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.error {
  color: red;
  position: absolute;
}
#app {
  background-color: rgb(240, 240, 240);
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.roter-view {
  width: 100%;
  //   min-height: 800px;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 80px);
}
::-webkit-scrollbars {
  width: 0;
  display: none;
}
</style>>
