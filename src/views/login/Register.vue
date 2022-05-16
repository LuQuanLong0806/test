<template>
  <div class="lweb-container">
    <Head></Head>

    <div class="module-container">
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <li @click="$router.push({ path: '/login' })">登录</li>
          <li class="layui-this">注册</li>
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
              <label class="layui-form-label">昵称</label>
              <div class="layui-input-inline" style="width: 300px">
                <ValidationProvider
                  name="nickname"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    name="nickname"
                    v-model.trim="registerData.nickname"
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
              <label class="layui-form-label">验证码</label>
              <div class="layui-input-inline">
                <ValidationProvider
                  name="capchat"
                  rules="required"
                  v-slot="{ errors }"
                  ref="capchat"
                >
                  <input
                    type="text"
                    name="capchat"
                    v-model="registerData.capchat"
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
                  @click="validate().then(regisetr)"
                  type="button"
                >
                  点击注册
                </button>
                <a
                  href="javascript:;"
                  class="forget-password"
                  @click="$router.push({ path: '/forget' })"
                  >忘记密码?</a
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Head from '@/components/Head'

import Login from '@/api/login'

import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'App',
  components: {
    ValidationProvider,
    ValidationObserver,
    Head,
  },
  data() {
    return {
      svg: '',
      registerData: {
        name: '',
        nickname: '',
        password: '',
        surepassword: '',
        capchat: '',
      },

      errprMsg: [],
      tab: 0,
    }
  },

  created() {},
  mounted() {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('SET_SID', sid)
    console.log(sid)
    this.getCaptcha()
  },
  methods: {
    // 校验两次密码是否一致
    checkPassword() {
      this.$refs.register.setErrors({ surepassword: ['两次密码输入不一致'] })
    },
    getCaptcha() {
      let sid = this.$store.state.sid
      Login.getCaptcha({ sid }).then((res) => {
        if (res.code == 200) {
          this.svg = res.data
        }
      })
    },
    async regisetr() {
      let valid = await this.$refs.register.validate()
      if (valid) {
        Login.reg({ ...this.registerData, sid: this.$store.state.sid })
          .then((res) => {
            if (res.code == 200) {
              this.$confirm(res.message, () => {
                this.$router.push({ path: '/login' })
              })
            } else {
              // this.$alert(res.message)
              this.$refs.register.setErrors(res.message)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
}
</script>

<style scoped>
.module-container {
  width: 1000px;
  padding: 50px;
  background-color: #fff;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  height: 500px;
  margin: 20px auto;
}
.lweb-container {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
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
