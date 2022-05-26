<template>
  <div>
    <div class="panel">
      <div class="d-flex-between" style="padding: 0 50px">
        <ul>
          <router-link tag="li" to="/"><a href="">首页</a></router-link>
          <router-link
            tag="li"
            v-for="(item, index) in lists"
            :to="item.path"
            :key="index + 'pannel'"
            class="layui-this"
            ><a>{{ item.name }}</a></router-link
          >

          <template v-if="$store.state.login.token">
            <li class="layui-col-xs"><span class="line"></span></li>
            <li class="layui-col-xs">
              <router-link to="">我发表的贴</router-link>
            </li>
            <li class="layui-col-xs">
              <router-link to="">我收藏的贴</router-link>
            </li>
          </template>
        </ul>
        <div
          class="layui-col-xs d-flex-center"
          style="width: 150px; text-align: right"
        >
          <span class="layui-icon layui-icon-search"></span>
          <router-link class="layui-btn" :to="{ path: '/add' }"
            >发表新帖</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  data() {
    return {
      lists: [
        { path: '/ask', name: '提问' },
        { path: '/', name: '分享' },
        { path: '/', name: '讨论' },
        { path: '/', name: '建议' },
        { path: '/', name: '公告' },
        { path: '/', name: '动态' },
      ],
    }
  },
}
</script>

<style  scoped>
@media (min-width: 800px) {
  .layui-container {
    flex-wrap: wrap;
  }
}
.layui-container {
  /* width: 1780px; */
}
.panel {
  height: auto;
  line-height: 50px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
ul li {
  display: inline-block;
}
ul li a {
  padding: 0 20px;
  font-weight: 600;
}
.line {
  height: 12px;
  display: inline-block;
  width: 1px;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.7);
}
.right {
  position: absolute;
  right: 0;
  top: 0;
}
.layui-icon {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  font-size: 24px;
  margin-right: 15px;
}
.layui-icon:hover {
  color: #009688;
}
</style>