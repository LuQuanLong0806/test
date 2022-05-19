<template>
  <div>
    <div class="confirm-content">
      <div class="font">
        您确定要将账号更改为：<span class="name"> {{ obj.name }}</span> 吗？
      </div>
      <div>
        <button
          type="button"
          class="layui-btn"
          :class="{ 'layui-btn layui-btn-disabled': isSend }"
        >
          {{ isSend ? "更改中" : "确定更新" }}
        </button>
        <router-link to="/" class="layui-btn layui-btn-primary"
          >返回首页</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserName } from "@/api/user";

export default {
  components: {},
  data() {
    return {
      obj: {},
      isSend: false,
    };
  },
  created() {
    this.obj = this.getParams();
    console.log(this.obj);
  },
  mounted() {},
  methods: {
    getParams() {
      let obj = {};
      decodeURIComponent(window.location.href)
        .replace(/.*\?/, "")
        .split("&")
        .map((d) => d.split("="))
        .map((d) => {
          obj[d[0]] = d[1];
        });
      return obj;
    },
    updateName() {
      updateUserName(this.obj).then((res) => {
        this.$pop(res.message);
        if (res.code == 200) {
          //
        } else {
          //
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-content {
  background: #fff;
  width: 520px;
  margin: 150px auto 0;
  padding: 50px;
  text-align: center;
  border-radius: 5px;
  .font {
    margin-bottom: 30px;
    font-size: 16px;
    color: #333;
  }
  .name {
    font-weight: 600;
  }
}
</style>