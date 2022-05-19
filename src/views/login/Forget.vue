<template>
  <div class="lweb-container">
    <div class="module-container">
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <!-- <li @click="$router.push({ path: '/login' })">登录</li> -->
          <li class="layui-this">找回密码</li>
        </ul>
      </div>
      <!-- 注册模块 -->
      <div>
        <ValidationObserver ref="register" v-slot="{ validate }">
          <form class="layui-form layui-form-pane" action="">
            <div class="layui-form-item">
              <label class="layui-form-label">用户名</label>
              <div class="layui-input-inline" style="width: 300px">
                <ValidationProvider
                  name="name"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    name="name"
                    v-model.trim="registerData.name"
                    placeholder="请输入用户名"
                    autocomplete="off"
                    class="layui-input"
                    :class="{ 'form-group-error': false }"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

            <div class="layui-form-item">
              <div class="layui-input-block" style="margin-left: 0">
                <button
                  class="layui-btn"
                  @click="validate().then(retrieve)"
                  :class="{ 'layui-btn-disabled': isSend }"
                  type="button"
                >
                  点击找回
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import Login from "@/api/login";

export default {
  name: "App",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      svg: "",
      registerData: {
        name: "",
      },
      errprMsg: [],
      isSend: false,
    };
  },
  mounted() {},
  methods: {
    async retrieve() {
      let valid = await this.$refs.register.validate();
      if (valid) {
        this.isSend = true;
        Login.retrievePwd({ ...this.registerData })
          .then((res) => {
            this.isSend = false;
            if (res.code == 200) {
              this.$pop(res.message);
            } else {
              this.$pop(res.message, "shake");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
.module-container {
  width: 1000px;
  padding: 50px;
  background-color: #fff;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  height: 500px;
  margin: 0 auto;
}
.lweb-container {
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #fff;
  padding-top: 20px;
}
.forget-password {
  cursor: pointer;
  margin-left: 20px;
}
.forget-password:hover {
  color: #009688;
}
.layui-form-mid {
  display: inline-block;
}
.form-group-error {
  /* outline: red; */
  box-shadow: red 0px 0px 5px 1px;
}
.layui-form-item {
  margin-bottom: 24px;
}
.error {
  color: red;
  position: absolute;
}
</style>
