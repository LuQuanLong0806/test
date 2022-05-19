<template>
  <div class="layui-form layui-form-pane">
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">
        <span
          class="icon-item"
          v-for="(item, index) in iconList"
          :key="'icon' + index"
        >
          <i class="iconfont" :class="item.icon"></i>
        </span>
      </label>
      <div class="layui-input-block">
        <textarea
          type="text"
          name="price_min"
          placeholder=""
          autocomplete="off"
          class="layui-input"
          style="height: 200px"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editor",
  data() {
    return {
      iconList: [
        {
          icon: "icon-biaoqing",
        },
        {
          icon: "icon-tupian",
        },
        {
          icon: "icon-lianjie",
        },
        {
          icon: "icon-quote",
        },
        {
          icon: "icon-hr",
        },
        {
          icon: "icon-icon_yulan",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/custom/iconfont.css";

.layui-input-block {
  width: 100%;
}
.icon-item {
  padding: 0 10px;
  .iconfont {
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
  }
}
</style>