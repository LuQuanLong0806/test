<template>
  <div id="app">
    <!-- <LoginVuelidate></LoginVuelidate> -->
    <!-- <LoginVeeValidate></LoginVeeValidate> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import LoginVuelidate from "@/components/LoginVuelidate";
// import LoginVeeValidate from '@/components/LoginVeeValidate'

export default {
  name: "App",
  components: {
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

<style scoped>
#app {
  background-color: rgb(240, 240, 240);
  min-height: 100vh;
}
</style>>
