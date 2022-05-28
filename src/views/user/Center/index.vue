<template>
  <div class="user-center">
    <div class="center-title">
      Hi,
      <span class="center-title-name">
        {{ userInfo.nickname }}
      </span>
      , 你已经是我们的正式会员!
    </div>
    <!-- 会员信息 -->
    <table class="layui-table" lay-even lay-skin="line" lay-size="lg">
      <tbody>
        <tr>
          <td>
            <span class="layui-table-title">我的会员信息</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              积分经验值:
              <span class="font-orange">{{ userInfo.favs || 0 }}</span>
            </p>
            <p>
              您当前为:
              <span class="font-orange">
                {{ userInfo.isVip == 1 ? "会员用户" : "普通用户" }}
              </span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 会员信息 -->
    <table class="layui-table" lay-even lay-skin="line" lay-size="lg">
      <tbody>
        <tr>
          <td>
            <div class="d-flex-between">
              <div class="sign-head d-flex">
                <span>签到</span>
                <div class="sign-head-line"></div>
                <span class="sign-head-desc" @click="showSign('Sign')"
                  >说明</span
                >
                <div class="sign-head-line"></div>
                <span
                  class="sign-head-desc"
                  @click="showLayer('showActiveList')"
                  >活跃榜</span
                >
              </div>
              <div>
                已连续签到 <span class="font-orange">{{ count }}</span
                >天
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <template v-if="!userInfo.isSign">
              <div class="d-flex-center">
                <button
                  type="button"
                  @click="todaySign"
                  class="layui-btn layui-btn-danger"
                >
                  今日签到
                </button>
                <p>
                  可获得 <span class="font-orange">{{ favs }}</span
                  >飞吻
                </p>
              </div>
            </template>

            <template v-else>
              <div class="d-flex-center">
                <button type="button" class="layui-btn layui-btn-disabled">
                  已签到
                </button>
                <p>
                  已获得 <span class="font-orange">{{ favs }}</span
                  >飞吻
                </p>
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 快捷方式 -->
    <table class="layui-table" lay-even lay-skin="line" lay-size="lg">
      <tbody>
        <tr>
          <td>
            <span class="layui-table-title">快捷方式</span>
          </td>
        </tr>
        <tr>
          <td>
            <div class="layui-row layui-col-space10">
              <div
                class="layui-col-md2 layui-col-xs3"
                v-for="(item, index) in fastMenu"
                :key="index"
              >
                <router-link :to="{ path: item.path }">
                  <div class="fast-item">
                    <i class="layui-icon" :class="item.icon"> </i>
                  </div>
                  <div class="fast-item-name">{{ item.name }}</div>
                </router-link>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 签到说明 -->
    <Sign ref="Sign"></Sign>
    <!-- 活跃 -->
    <Layer v-model="showActiveList" title="签到活跃榜-TOP20" :width="350">
      <ActiveList></ActiveList>
    </Layer>
  </div>
</template>

<script>
import Sign from "./Sign.vue";
import ActiveList from "./ActiveList.vue";
import Layer from "./../components/Layer.vue";

import { userSign, getUserInfo } from "@/api/user";

export default {
  name: "user-center",
  components: {
    Sign,
    Layer,
    ActiveList,
  },
  data() {
    return {
      fastMenu: [
        {
          icon: "layui-icon-set",
          name: "修改信息",
          path: "/User/BaseSetting",
        },
        {
          icon: "layui-icon-face-smile",
          name: "修改头像",
          path: "/User/BaseSetting",
        },
        {
          icon: "layui-icon-password",
          name: "修改密码",
          path: "/User/BaseSetting",
        },
        {
          icon: "layui-icon-username",
          name: "账号绑定",
          path: "/User/BaseSetting",
        },
        {
          icon: "layui-icon-add-circle",
          name: "发表新帖",
          path: "/User",
        },
        {
          icon: "layui-icon-share",
          name: "查看分享",
          path: "/User",
        },
        {
          icon: "layui-icon-template",
          name: "我的贴子",
          path: "/User",
        },
        {
          icon: "layui-icon-rate-solid",
          name: "我的收藏",
          path: "/User",
        },
        {
          icon: "layui-icon-template-1",
          name: "其他资料",
          path: "/User",
        },
        {
          icon: "layui-icon-login-wechat",
          name: "关注公众号",
          path: "/User",
        },
        {
          icon: "layui-icon-file",
          name: "文档",
          path: "/User",
        },
        {
          icon: "layui-icon-app",
          name: "后台管理",
          path: "/User",
        },
      ],
      showActiveList: false, //
      timer: null,
    };
  },
  computed: {
    favs() {
      let fav = 0;
      let count = parseInt(this.count);
      count += 1;
      if (count < 5) {
        fav = 5;
      } else if (count >= 5 && count < 15) {
        fav = 10;
      } else if (count >= 15 && count < 30) {
        fav = 15;
      } else if (count >= 30 && count < 100) {
        fav = 20;
      } else if (count >= 100 && count < 365) {
        fav = 30;
      } else {
        fav = 50;
      }
      return fav;
    },

    

    count() {
      if (this.userInfo.count) {
        return this.userInfo.count;
      } else {
        return 0;
      }
    },
    userInfo() {
      return this.$store.state.login.userInfo || {};
    },
  },
  created() {
    this.getInfo();
    // setInterval(() => {
    //   let Date = new Date();
    //   console.log("Date", Date);
    // }, 1000);
  },

  methods: {
    //
    getInfo() {
      getUserInfo().then((res) => {
        this.$store.commit("login/SET_USER_INFO", res.data);
      });
    },
    todaySign() {
      userSign().then((res) => {
        this.$alert(res.message);
        if (res.code == 200) {
          let data = res.data;
          let userInfo = this.$store.state.login.userInfo;
          userInfo.isSign = true;
          userInfo.favs = data.favs;
          userInfo.count = data.count;
          this.$store.commit("login/SET_USER_INFO", userInfo);
        }
      });
    },
    showSign(name) {
      this.$refs[name].isShow = true;
    },
    showLayer(name) {
      this[name] = true;
    },
  },
};
</script>

 <style lang="scss" scoped>
.user-center {
  background-color: #fff;
  padding: 20px;
}
.center-title {
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  background-color: #fafafa;
  color: #333;
  font-family: Courier New;
  &-name {
    font-weight: 600;
  }
}
.layui-table {
  &-title {
    font-weight: 600;
    color: #333;
    font-size: 14px;
  }
  tr,
  td {
    background-color: #fff;
  }
}
.sign-head {
  color: #333;
  font-weight: 600;
  span {
    cursor: pointer;
  }
  &-desc {
    color: var(--theme-color);
  }
  &-line {
    width: 1px;
    height: 12px;
    background-color: #ececec;
    margin: 0 8px;
  }
}

.fast-item {
  text-align: center;
  cursor: pointer;
  &-name {
    text-align: center;
    height: 24px;
    line-height: 24px;
    font-weight: 600;
    color: #333;
    font-size: 14px;
  }
  .layui-icon {
    font-size: 30px;
    color: #fff;
  }
  background-color: var(--theme-color);
  height: 52px;
  line-height: 52px;
}
</style> 