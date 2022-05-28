<template>
  <!-- 注册模块 -->
  <div style="padding: 30px">
    <ValidationObserver ref="pwd" v-slot="{ validate }">
      <form class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <label class="layui-form-label">当前密码</label>
          <div class="layui-input-inline">
            <ValidationProvider
              name="oldpwd"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="password"
                name="oldpwd"
                v-model="pwd.oldpwd"
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
                v-model="pwd.password"
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
                v-model="pwd.surepassword"
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
              @click="validate().then(submit)"
              type="button"
            >
              确认修改
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import { changePassword } from '@/api/user'

export default {
  name: 'App',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      pwd: {
        password: '',
        oldpwd: '',
        surepassword: '',
      },
      errprMsg: [],
    }
  },

  created() {},
  mounted() {},
  methods: {
    // 校验两次密码是否一致
    checkPassword() {
      this.$refs.pwd.setErrors({ surepassword: ['两次密码输入不一致'] })
    },

    async submit() {
      if (this.pwd.oldpwd !== this.pwd.password) {
        this.checkPassword()
        return
      }

      let valid = await this.$refs.pwd.validate()
      if (valid) {
        changePassword({
          oldpwd: this.pwd.oldpwd,
          newpwd: this.pwd.password,
          surepassword: this.pwd.surepassword,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$confirm(
                res.message,
                () => {
                  this.$router.push({ path: '/login' })
                },
                () => {
                  this.$router.push({ path: '/login' })
                }
              )
            } else {
              // this.$alert(res.message)
              this.$pop(res.message)
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
.layui-input-inline {
  width: 300px;
}
</style>
