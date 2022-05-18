<template>
  <div class="lweb-container">
    <div class="module-container">
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <li class="layui-this">重置密码</li>
        </ul>
      </div>
      <!-- 注册模块 -->
      <div>
        <ValidationObserver ref="register" v-slot="{ validate }">
          <form class="layui-form layui-form-pane" action="">
            <div class="layui-form-item">
              <label class="layui-form-label">新密码</label>
              <div class="layui-input-inline">
                <ValidationProvider
                  name="password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="password"
                    name="password"
                    v-model="registerData.password"
                    placeholder="请输入密码"
                    autocomplete="off"
                    class="layui-input"
                    :class="{ 'form-group-error': false }"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">确认密码</label>
              <div class="layui-input-inline">
                <ValidationProvider
                  name="surepassword"
                  rules="required"
                  v-slot="{ errors }"
                  ref="surepassword"
                >
                  <input
                    type="password"
                    name="surepassword"
                    v-model="registerData.surepassword"
                    placeholder="请确认密码"
                    autocomplete="off"
                    class="layui-input"
                    :class="{ 'form-group-error': false }"
                    @blur="checkPassword"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

            <div class="layui-form-item">
              <div class="layui-input-block" style="margin-left: 0">
                <button
                  class="layui-btn"
                  @click="validate().then(resetPwd)"
                  :class="{ 'layui-btn-disabled': isClick }"
                  type="button"
                >
                  确认重置
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
      registerData: {
        password: "",
        surepassword: "",
      },
      infoObj: {
        name: "",
        key: "",
        token: "",
      },
      errprMsg: [],
      isClick: false,
    };
  },

  created() {
    this.infoObj = this.$route.query;
  },
  mounted() {},
  methods: {
    // 校验两次密码是否一致
    checkPassword() {
      if (this.registerData !== this.registerData.surepassword) {
        this.$refs.register.setErrors({ surepassword: ["两次密码输入不一致"] });
      }
    },
    async resetPwd() {
      let valid = await this.$refs.register.validate();
      //   this.checkPassword();
      if (valid) {
        this.isClick = true;
        Login.resetPwd({ ...this.registerData, ...this.infoObj })
          .then((res) => {
            this.isClick = false;

            if (res.code == 200) {
              this.$confirm(
                res.message,
                () => {
                  this.$router.push({ path: "/entrance/login" });
                },
                () => {
                  this.$router.push({ path: "/entrance/login" });
                }
              );
            } else {
              // this.$alert(res.message)
              //   this.$pop(res.message, "shake");
              this.$refs.surepassword.setErrors([res.message]);
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

<style lang="scss" scoped>
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
.layui-input-inline {
  width: 400px;
}
</style>
