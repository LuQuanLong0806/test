<template>
  <div class="lweb-container">
    <div class="module-container" v-drag>
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <li class="layui-this">登录</li>
          <li @click="$router.push({ path: '/register' })">注册</li>
        </ul>
      </div>
      <!-- 登录验证 -->
      <div>
        <ValidationObserver ref="ob" v-slot="{ validate }">
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
                    v-model.trim="formData.name"
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
              <label class="layui-form-label">密码</label>
              <div class="layui-input-inline">
                <ValidationProvider
                  name="password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="password"
                    name="password"
                    v-model="formData.password"
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
              <label class="layui-form-label">验证码</label>
              <div class="layui-input-inline">
                <ValidationProvider
                  name="captcha"
                  rules="required"
                  v-slot="{ errors }"
                  ref="captcha"
                >
                  <input
                    type="text"
                    name="captcha"
                    v-model="formData.captcha"
                    placeholder="请输入验证码"
                    autocomplete="off"
                    class="layui-input"
                    :class="{ 'form-group-error': false }"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div
                class="layui-form-mid layui-word-aux"
                style="margin-top: -20px"
              >
                <span @click="getCaptcha()" v-html="svg"></span>
              </div>
            </div>

            <div class="layui-form-item">
              <div class="layui-input-block" style="margin-left: 0">
                <button
                  class="layui-btn"
                  @click="validate().then(submit)"
                  type="button"
                >
                  点击登录
                </button>
                <router-link class="forget-password" :to="{ path: '/forget' }"
                  >忘记密码? 前往找回</router-link
                >
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
import { getUserInfo } from "@/api/user";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    drag: {
    inserted: function (el, binding, vnode) {
        console.log("el", el, binding, vnode);
        // 初始化
        vnode.context.__imgX = 0;
        vnode.context.__imgY = 0;
        vnode.context.__imgXY = {
            x: 0,
            y: 0
        };
        let o = vnode.context.__imgXY;
        let c = vnode.context;
        el.onmousedown = (e) => {
            // e.stopPropagation();
            e.preventDefault();
            o.x = e.x;
            o.y = e.y;
            el.onmousemove = (e) => {
                let x2 = e.x;
                let y2 = e.y;
                // 获取移动距离
                let x = x2 - o.x; // +-
                let y = y2 - o.y;

                c.__imgX += x;
                c.__imgY += y;

                // 讲当前位置保存方便下次移动进行比较
                o.x = x2;
                o.y = y2;

                el.style.transform =
                    'translate(' + c.__imgX + 'px' + ',' + c.__imgY + 'px' + ')';
            };
        };
        el.onmouseup = () => {
            el.onmousemove = null;
        };
    }
    },
  },
  data() {
    return {
      svg: "",
      formData: {
        name: "",
        password: "",
        captcha: "",
      },
      registerData: {
        name: "",
        nickname: "",
        password: "",
        surepassword: "",
        captcha: "",
      },

      errprMsg: [],
      tab: 0,
    };
  },

  created() {},
  mounted() {
    let sid = "";
    if (localStorage.getItem("sid")) {
      sid = localStorage.getItem("sid");
    } else {
      sid = uuidv4();
      localStorage.setItem("sid", sid);
    }
    this.$store.commit("SET_SID", sid);
    console.log(sid);
    this.getCaptcha();
  },
  methods: {
    // 校验两次密码是否一致
    checkPassword() {
      console.log("请确认密码");
      console.log(this.$refs.surepassword);
      this.$refs.surepassword.setErrors(["两次密码输入不一致"]);
    },
    setName(value) {
      this.formData.name = value;
    },
    getCaptcha() {
      let sid = this.$store.state.sid;
      Login.getCaptcha({ sid }).then((res) => {
        if (res.code == 200) {
          this.svg = res.data;
        }
      });
    },
    async submit() {
      let valid = await this.$refs.ob.validate();
      if (valid) {
        Login.login({ ...this.formData, sid: this.$store.state.sid })
          .then((res) => {
            if (res.code == 200) {
              let data = res.data;
              this.$store.commit("login/SET_TOKEN", data.token);
              // 获取用户信息
              getUserInfo().then((res) => {
                this.$store.commit("login/SET_USER_INFO", res.data);
                let path = this.$route.query.redirect || "/index";
                this.$router.push({ path: path });
              });
            } else {
              this.$pop(res.message, "shake");
              this.$refs.captcha.setErrors([res.message]);
              this.$store.commit("login/SET_IS_LOGIN", false);
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
  padding-top: 20px;
}

.forget-password {
  cursor: pointer;
  margin-left: 20px;
}
.forget-password:hover {
  color: var(--theme-color);
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
