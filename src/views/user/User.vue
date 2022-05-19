<template>
  <div class="layui-row" style="margin-top: 20px">
    <div class="layui-col-md2">
      <div class="user-menu">
        <ul class="layui-nav layui-nav-tree site-demo-nav">
          <li
            class="user-menu-item layui-nav-item"
            v-for="(item, index) in menuList"
            :key="index"
          >
            <router-link
              :to="{ path: item.link }"
              :active-class="item.activeClass"
            >
              <i class="iconfont" :class="item.icon"></i>
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="layui-col-md10">
      <div class="user-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      menuList: [
        {
          link: "/index",
          icon: "icon-home",
          name: "我的主页",
          activeClass: "layui-this",
        },
        {
          link: "/User/Center",
          icon: "icon-user-fill",
          name: "用户中心",
          activeClass: "layui-this",
        },
        {
          link: "/User/BaseSetting",
          icon: "icon-setting",
          name: "基本设置",
          activeClass: "layui-this",
        },
        {
          link: "/User/MyPosts",
          icon: "icon-text",
          name: "我的帖子",
          activeClass: "layui-this",
        },
        {
          link: "/User/MyMessage",
          icon: "icon-message-fill",
          name: "我的消息",
          activeClass: "layui-this",
        },
        {
          link: "/User/Others",
          icon: "icon-product",
          name: "其他设置",
          activeClass: "layui-this",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import "./../../assets/custom/iconfont.css";

@media (max-width: 1170px) {
  .user-menu {
    display: none;
  }
}
.user-content {
  width: calc(100% - 30px);
  margin: 0 auto;
}
.user-menu {
  background-color: #393d49;
  width: 200px;
  margin: 0 auto;
  height: 600px;
}
.user-menu-item {
}
.iconfont {
  margin-right: 10px;
}
</style>