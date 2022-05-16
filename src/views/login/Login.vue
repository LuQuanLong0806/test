<template>
  <div class="lweb-container">
    <Head></Head>
    <div class="module-container">
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
                  name="capchat"
                  rules="required"
                  v-slot="{ errors }"
                  ref="capchat"
                >
                  <input
                    type="text"
                    name="capchat"
                    v-model="formData.capchat"
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
      formData: {
        name: '',
        password: '',
        capchat: '',
      },
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
    window.vue = this
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
      console.log('请确认密码')
      console.log(this.$refs.surepassword)
      this.$refs.surepassword.setErrors(['两次密码输入不一致'])
    },
    setName(value) {
      this.formData.name = value
    },
    getCaptcha() {
      let sid = this.$store.state.sid
      Login.getCaptcha({ sid }).then((res) => {
        if (res.code == 200) {
          this.svg = res.data
        }
      })
    },
    async submit() {
      let valid = await this.$refs.ob.validate()
      if (valid) {
        Login.login({ ...this.formData, sid: this.$store.state.sid })
          .then((res) => {
            if (res.code == 200) {
              console.log('res', res.data)
              let data = res.data
              //   this.$alert(res.message);
              // Object.keys(this.formData).forEach((d) => {
              //   this.formData[d] = ''
              // })
              this.$store.commit('login/SET_TOKEN', data.token)
              this.$store.commit('login/SET_USER_INFO', data.userInfo)
              this.$router.push({ path: '/index' })
            } else {
              this.$pop(res.message, 'shake')
              this.$refs.capchat.setErrors([res.message])
              this.$store.commit('login/SET_IS_LOGIN', false)
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
.error {
  color: red;
}
</style>
