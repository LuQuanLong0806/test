<template>
  <div class="head d-flex">
    <div class="">
      <img src="" alt="" />
    </div>

    <div class="d-flex">
      <!-- 未登录 -->
      <ul class="d-flex" v-if="!$store.state.login.token">
        <!-- <li>
          <router-link :to="{ path: '/User' }">
            <img class="user-pic" src="" alt="" />
          </router-link>
        </li> -->
        <li>
          <router-link class="user-font" :to="{ path: '/login' }"
            >登录</router-link
          >
        </li>
        <li>
          <router-link class="user-font" :to="{ path: '/register' }"
            >注册</router-link
          >
        </li>
        <li>
          <router-link class="user-font" :to="{ path: '/User' }">
            <i class="layui-icon layui-icon-login-qq"></i>
          </router-link>
        </li>
        <li>
          <router-link class="user-font" :to="{ path: '/login' }">
            <i class="layui-icon layui-icon-login-weibo"></i>
          </router-link>
        </li>
      </ul>

      <!-- 登录 -->
      <div class="d-flex user" v-else>
        <span class="user-font">
          <router-link class="user-font" :to="{ path: '/User' }">{{
            $store.state.login.userInfo.nickname
          }}</router-link>
        </span>
        <span class="p-relative user-hover" style="width: 36px; height: 36px">
          <router-link :to="{ path: '/User' }">
            <img
              class="user-pic"
              :src="$store.state.login.userInfo.pic || defaultImg"
              alt=""
            />
          </router-link>
          <div class="i-menu" style="">
            <ul class="i-menu-container">
              <li
                class="i-menu-item"
                v-for="(item, index) in userMenu"
                :key="index"
              >
                <router-link :to="{ path: item.link }">
                  <i class="iconfont" :class="item.icon"></i>
                  {{ item.name }}
                </router-link>
              </li>

              <li class="i-menu-item" @click="logOut">退出</li>
            </ul>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMenu: [
        {
          link: "/index",
          icon: "icon-home",
          name: "我的主页",
        },
        {
          link: "/User/BaseSetting",
          icon: "icon-setting",
          name: "基本设置",
        },

        {
          link: "/User/MyMessage",
          icon: "icon-message-fill",
          name: "我的消息",
        },
      ],
      defaultImg: require("@/assets/user/avatar.jpg"),
    };
  },
  mounted() {},
  methods: {
    logOut() {
      this.$confirm("确定要退出登录吗?", () => {
        this.$store.commit("login/SET_TOKEN", "");
        this.$store.commit("login/SET_USER_INFO", {});
        localStorage.clear();
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./../assets/custom/iconfont.css";

.head {
  width: 100%;
  height: 80px;
  background-color: #222;
  //   background-color: #0aa1ed;
  justify-content: space-between;
  padding: 0 50px;
  box-sizing: border-box;
}
.d-flex {
  display: flex;
  align-items: center;
}
.user img {
}

$c: #fff;
.user-font {
  .layui-icon {
    font-size: 22px;
  }
  color: $c;
  font-size: 14px;
  margin: 0 10px;
}
.user-pic {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  //   border: 1px solid $c;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 1);

  cursor: pointer;
}
.p-relative {
  position: relative;
}
.user-hover:hover .i-menu {
  display: block;
}

.i-menu {
  display: none;
  position: absolute;
  top: 36px;
  width: 120px;
  right: -35px;
  z-index: 100;
  padding-top: 10px;
  &-container {
    background-color: #fff;
    border-radius: 10px;
    padding-top: 10px;
    box-shadow: 0 0 6px 2px rgba(204, 204, 204, 0.3);
  }

  &-item {
    height: 38px;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
  }
  li:last-child() {
  }
}
</style>