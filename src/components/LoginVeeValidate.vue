<template>
  <div class="lweb-container">
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
          <div class="layui-form-mid layui-word-aux" style="margin-top: -20px">
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
            <a class="forget-password">忘记密码?</a>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import Login from '@/api/login'

import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'App',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      svg: '',
      formData: {
        name: '',
        password: '',
        capchat: '',
      },
      errprMsg: [],
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
      console.log('valid~', valid)
      if (valid) {
        Login.login({ ...this.formData, sid: this.$store.state.sid })
          .then((res) => {
            if (res.code == 200) {
              // console.log("res", res);
              Object.keys(this.formData).forEach((d) => {
                this.formData[d] = ''
              })
            } else {
              this.$alert(res.message)
              this.$refs.capchat.setErrors([res.message])
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
#app {
  background-color: grey;
  min-height: 100vh;
}
.lweb-container {
  width: 1000px;
  padding: 50px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
}
.forget-password {
  cursor: pointer;
  margin-left: 20px;
}
.forget-password:hover {
  color: #009688;
}
.layui-form-mid {
}
.form-group-error {
  /* outline: red; */
  box-shadow: red 0px 0px 5px 1px;
}
.error {
  color: red;
}
</style>>
