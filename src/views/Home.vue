<template>
  <div>
    <div class="panel">
      <div class="layui-container">
        <ul>
          <li><a href="">首页</a></li>
          <li><a href="">提问</a></li>
          <li><a href="">分享</a></li>
          <li><a href="">讨论</a></li>
          <li><a href="">建议</a></li>
          <li><a href="">公告</a></li>
          <li><a href="">动态</a></li>
          <li><span class="line"></span></li>
          <li><a href="">我发表的贴</a></li>
          <li><a href="">我收藏的贴</a></li>
        </ul>

        <div class="right">

            <a href="" class="layui-button">发帖</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style scoped>
.panel {
  height: 50px;
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
}
.line {
  height: 12px;
  display: inline-block;
  width: 1px;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.7);
}
.right {
    float: right;
}
</style>