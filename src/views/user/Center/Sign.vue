<template>
  <div>
    <!-- 签到说明 -->
    <div class="modal" v-if="isShow">
      <div class="mask" @click="close"></div>
      <div class="layui-layer" :class="{ active: isShow }">
        <div class="layui-layer-title">
          签到说明
          <i class="layui-icon layui-icon-close pull-right" @click="close"></i>
        </div>
        <div class="layui-layer-content">
          <div class="layui-elem-quote">"签到可获得社区积分,规则如下"</div>
          <table class="layui-table">
            <colgroup>
              <col width="200" />
              <col width="200" />
            </colgroup>
            <thead>
              <tr>
                <th>连续签到天数</th>
                <th>每天可获得积分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;5</td>
                <td>5</td>
              </tr>

              <tr>
                <td>&gt;=5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>&gt;=15</td>
                <td>15</td>
              </tr>
              <tr>
                <td>&gt;=30</td>
                <td>20</td>
              </tr>
              <tr>
                <td>&gt;=100</td>
                <td>30</td>
              </tr>
              <tr>
                <td>&gt;=365</td>
                <td>50</td>
              </tr>
            </tbody>
          </table>

          <div>
            <p>中间若有间断,则连续天数重新计算</p>
            <p class="font-orange">不可复用程序自动签到,否则积分清零</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}
.font-orange {
  color: orangered;
}
.modal {
}
.layui-layer {
  position: fixed;
  width: 320px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -240px;
  background-color: #fff;
  z-index: 2001;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  &-title {
    height: 38px;
    line-height: 38px;
    margin-bottom: 10px;
    background-color: #fafafa;
    padding: 0 20px;
    .pull-right {
      float: right;
      cursor: pointer;
    }
  }
  &-content {
    padding: 0 20px;
  }
}
</style>