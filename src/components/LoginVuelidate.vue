<template>
    <div class="lweb-container">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>

          <div class="layui-input-inline" style="width: 300px">
            <input
              type="text"
              name="title"
              v-model.trim="formData.name"
              @input="setName($event.target.value)"
              placeholder="请输入用户名"
              autocomplete="off"
              class="layui-input"
              :class="{ 'form-group-error': $v.formData.name.$error }"
            />
            <div class="error" v-if="!$v.formData.name.required">
              用户名不得为空!
            </div>
            <div class="error" v-if="!$v.formData.name.email">
              用户名格式错误!
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              name="password"
              v-model="formData.password"
              placeholder="请输入密码"
              autocomplete="off"
              class="layui-input"
              :class="{ 'form-group-error': $v.formData.password.$error }"
            />
            <div class="error" v-if="!$v.formData.password.required">
              密码不得为空!
            </div>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="capchat"
              v-model="formData.capchat"
              placeholder="请输入验证码"
              autocomplete="off"
              class="layui-input"
              :class="{ 'form-group-error': $v.formData.password.$error }"
            />
            <div class="error" v-if="!$v.formData.capchat.required">
              验证码不得为空!
            </div>
          </div>

          <div class="layui-form-mid layui-word-aux" style="margin-top: -20px">
            <span @click="getCaptcha()" v-html="svg"></span>
          </div>
        </div>

        <div class="layui-form-item">
          <div class="layui-input-block" style="margin-left: 0">
            <button
              class="layui-btn"
              @click="checkForm"
              type="button"
            >
              点击登录
            </button>
            <a class="forget-password">忘记密码?</a>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'App',
  components: {},
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
  validations: {
    formData: {
      name: {
        required,
        email,
      },
      password: {
        required,
      },
      capchat: {
        required,
      },
    },
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    setName(value) {
      this.formData.name = value
      this.$v.formData.name.$touch() //
    },
    getCaptcha() {
        let url = 'http://172.16.2.95:9090/captcha';
        // let url = 'http://localhost:9090/captcha';
      axios.get(url).then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            this.svg = res.data.data
          }
        }
      })
    },
    checkForm() {
      console.log('formData', this.formData)
      this.errprMsg = []
      if (!this.formData.name) {
        this.errprMsg.push('用户名不能为空!')
      }

      if (!this.formData.password) {
        this.errprMsg.push('密码不能为空!')
      }

      if (!this.formData.capchat) {
        this.errprMsg.push('验证码不能为空!')
      }

      console.log('this.errprMsg', this.errprMsg)
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
  margin: 0 auto;
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
}
.form-group-error {
  /* outline: red; */
  box-shadow: red 0px 0px 5px 1px;
}
.error {
  color: red;
}
</style>>
