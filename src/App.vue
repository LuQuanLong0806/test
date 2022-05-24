<template>
  <div id="app">
    <!-- <LoginVuelidate></LoginVuelidate> -->
    <!-- <LoginVeeValidate></LoginVeeValidate> -->
    <Head></Head>
    <router-view></router-view>
  </div>
</template>

<script>
// import LoginVuelidate from "@/components/LoginVuelidate";
// import LoginVeeValidate from '@/components/LoginVeeValidate'
import Head from '@/components/Head'

export default {
  name: 'App',
  components: {
    Head,
    // LoginVuelidate,
    // LoginVeeValidate,
  },
  data() {
    return {}
  },
  validations: {},
  created() {},
  methods: {},
}
</script>

<style  lang="scss">
@import './assets/css/global.css';
@import './assets/css/layui-layer/layer.css';

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
  min-height: 100vh;
}

::-webkit-scrollbars {
  width: 0;
  display: none;
}
</style>>
