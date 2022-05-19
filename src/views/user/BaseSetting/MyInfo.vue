<template>
  <div style="padding: 30px">
    <ValidationObserver ref="ob" v-slot="{ validate }">
      <div class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block layui-input-width">
            <ValidationProvider
              name="name"
              rules="required|email"
              v-slot="{ errors }"
            >
              <input
                type="text"
                placeholder="请输入邮箱"
                class="layui-input"
                v-model="form.name"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- <div class="layui-form-mid layui-word-aux">
            如果您在邮箱已激活的情况下，变更了邮箱，需
            <a class="check-email-link" href="/active.html">重新验证邮箱</a>。
          </div> -->
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">昵称</label>
          <div class="layui-input-block layui-input-width">
            <ValidationProvider
              name="nickname"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                placeholder="请输入昵称"
                class="layui-input"
                v-model="form.nickname"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">城市</label>
          <div class="layui-input-block layui-input-width">
            <input
              type="text"
              placeholder="请输入城市"
              class="layui-input"
              v-model="form.location"
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">性别</label>
          <div class="layui-input-block d-flex">
            <label for="gender1" class="label-margin">
              <input
                v-model="form.gender"
                type="radio"
                name="gender"
                value="1"
                id="gender1"
              />
              <i
                class="layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': form.gender == 1 }"
              ></i>
              男
            </label>
            <label for="gender2" class="label-margin">
              <input
                v-model="form.gender"
                type="radio"
                name="gender"
                value="2"
                id="gender2"
              />
              <i
                class="layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': form.gender == 2 }"
              ></i>
              女
            </label>
            <label for="gender3" class="label-margin">
              <input
                v-model="form.gender"
                type="radio"
                name="gender"
                value="3"
                id="gender3"
              />
              <i
                class="layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': form.gender == 3 }"
              ></i>
              保密
            </label>
          </div>
        </div>

        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label" style="max-width: 1000px">签名</label>
          <div class="layui-input-block" style="max-width: 1000px">
            <textarea
              type="textarea"
              placeholder="你的人生你选择，你的选择你负责！"
              class="layui-textarea"
              v-model="form.regmark"
            />
          </div>
        </div>

        <div class="layui-form-item">
          <button
            class="layui-btn"
            :class="{ 'layui-btn-disabled': isSubmit }"
            type="button"
            @click="validate().then(submit)"
          >
            立即提交
          </button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import { updateUserInfo, getUserInfo } from "@/api/user";

export default {
  name: "MyInfo",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        name: "",
        nickname: "",
        gender: "0",
        location: "",
        regmark: "",
      },
      isSubmit: false,
    };
  },
  mounted() {
    let userInfo = this.$store.state.login.userInfo;
    Object.keys(this.form).forEach((d) => {
      userInfo[d] ? (this.form[d] = userInfo[d]) : (this.form[d] = "");
    });
  },
  methods: {
    async submit() {
      console.log(this.form);
      const isValid = await this.$refs.ob.validate();
      if (!isValid) return;
      this.isSubmit = true;
      updateUserInfo(this.form).then((res) => {
        this.isSubmit = false;
        if (res.code == 200) {
          // 前端更新用户资料
          getUserInfo().then((res) => {
            if (res.code == 200) {
              this.$store.commit("login/SET_USER_INFO", res.data);
            }
          });
        }
        this.$pop(res.message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 760px) {
  .layui-input-width {
    width: 250px;
  }
}

@media screen and (min-width: 970px) {
  .layui-input-width {
    width: 320px;
  }
}

@media screen and (min-width: 1280px) {
  .layui-input-width {
    width: 420px;
  }
}

@media screen and (min-width: 1980px) {
  .layui-input-width {
    width: 500px;
  }
}
.layui-form-item {
  margin-bottom: 24px;
}
.label-margin {
  margin: 0 10px;
  cursor: pointer;
}
.layui-icon-radio {
  color: rgba(0, 150, 136, 0.8);
}
.check-email-link {
  color: #0aa1ed;
}
.error {
  color: red;
  position: absolute;
}
</style>