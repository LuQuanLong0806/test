<template>
  <div>
    <div class="fly-home fly-panel" style="background-image: url()">
      <img :src="userInfo.pic" alt="" />
      <i class="iconfont icon-renzheng" title="社区认证"></i>
      <h1>
        {{ userInfo.nickname }}
      </h1>
      <i class="iconfont icon-nan" v-if="userInfo.gender == 1"></i>
      <i class="iconfont icon-nv" v-else-if="userInfo.gender == 0"></i>
      <i class="layui-badge fly-badge-vip" v-if="userInfo.isVip"
        >VIP{{ userInfo.isVip }}</i
      >
      <!--
        <span style="color:#c00;">（管理员）</span>
        <span style="color:#5FB878;">（社区之光）</span>
        <span>（该号已被封）</span>
      -->

      <!-- <p style="padding: 10px 0; color: #5fb878">认证信息：layui 作者</p> -->

      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="飞吻"></i
        ><span style="color: #ff7200">{{ userInfo.favs }}飞吻</span>
        <i class="iconfont icon-shijian"></i
        ><span>{{ userInfo.created | dateFormat }} 加入</span>
        <i class="iconfont icon-chengshi"></i
        ><span>来自{{ userInfo.location }}</span>
      </p>

      <p class="fly-home-sign">（{{ userInfo.regmark }}）</p>

      <div class="fly-sns" data-user="">
        <a
          href="javascript:;"
          class="layui-btn layui-btn-primary fly-imActive"
          data-type="addFriend"
          >加为好友</a
        >
        <a
          href="javascript:;"
          class="layui-btn layui-btn-normal fly-imActive"
          data-type="chat"
          >发起会话</a
        >
      </div>
    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.nickname }} 最近的提问</h3>
            <ul class="jie-row">
              <li>
                <span class="fly-jing">精</span>
                <a href="" class="jie-title"> 谈谈你对发布订阅模式的理解</a>
                <i>刚刚</i>
                <em class="layui-hide-xs">1136阅/27答</em>
              </li>
              <li>
                <a href="" class="jie-title"> 谈谈你对发布订阅模式的理解</a>
                <i>1天前</i>
                <em class="layui-hide-xs">1136阅/27答</em>
              </li>
              <li>
                <a href="" class="jie-title"> 谈谈你对发布订阅模式的理解</a>
                <i>2017-10-30</i>
                <em class="layui-hide-xs">1136阅/27答</em>
              </li>
              <li>
                <a href="" class="jie-title"> 谈谈你对发布订阅模式的理解</a>
                <i>1天前</i>
                <em class="layui-hide-xs">1136阅/27答</em>
              </li>
              <li>
                <a href="" class="jie-title"> 谈谈你对发布订阅模式的理解</a>
                <i>1天前</i>
                <em class="layui-hide-xs">1136阅/27答</em>
              </li>
              <li>
                <a href="" class="jie-title"> 谈谈你对发布订阅模式的理解</a>
                <i>1天前</i>
                <em class="layui-hide-xs">1136阅/27答</em>
              </li>
              <li>
                <a href="" class="jie-title"> 谈谈你对发布订阅模式的理解</a>
                <i>1天前</i>
                <em class="layui-hide-xs">1136阅/27答</em>
              </li>
              <!-- <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">没有发表任何求解</i></div> -->
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.nickname }} 最近的回答</h3>
            <ul class="home-jieda">
              <li>
                <p>
                  <span>1分钟前</span>
                  在<a href="" target="_blank">tips能同时渲染多个吗?</a>中回答：
                </p>
                <div class="home-dacontent">
                  尝试给layer.photos加上这个属性试试：
                  <pre>
                    full: true
                    </pre
                  >
                  文档没有提及
                </div>
              </li>
              <li>
                <p>
                  <span>5分钟前</span>
                  在<a href="" target="_blank">在Imooc社区用的是什么系统啊?</a
                  >中回答：
                </p>
                <div class="home-dacontent">
                  Imooc社区采用的是NodeJS。分享出来的只是前端模版
                </div>
              </li>

              <!-- <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div> -->
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="fly-footer" v-if="false">
      <p>
        <a href="/" target="_blank">Imooc社区</a> 2017 &copy;
        <a href="/" target="_blank">layui.com 出品</a>
      </p>
      <p>
        <a href="/jie/3147/" target="_blank">付费计划</a>
        <a href="/template/fly/" target="_blank">获取Imooc社区模版</a>
        <a href="/jie/2461/" target="_blank">微信公众号</a>
      </p>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let params = {};
      getUserInfo(params).then((res) => {
        if (res.code == 200) {
          this.userInfo = res.data;
          this.$store.commit("login/SET_USER_INFO", res.data);

          console.log("this.userInfo", this.userInfo);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-family: "layui-icon-fly" !important;
}
.icon {
  &-nan {
    color: #4ebbf9;
    margin: 0 10px 0 5px;
  }
  &-nv {
    color: #f581b1;
    margin: 0 10px 0 5px;
  }
  &-baomi {
    margin: 0 10px 0 5px;
  }
}
</style>