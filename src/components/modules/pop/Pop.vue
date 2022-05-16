<template>
  <div
    class="tips animation"
    v-show="isShow"
    ref="Pop"
    :class="{ shake: type == 'shake' }"
  >
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "Pop",
  props: {
    msg: {
      type: String,
      default: "没有任何消息!",
    },
    type: {
      type: String,
      default: "shake",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      setTimeout(() => {
        this.isShow = false;
        this.msg = "";
        // this.type = "";
      }, 3000);
    },
  },
  watch: {
    isShow(newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        //
        setTimeout(() => {
          let Pop = this.$refs.Pop;
          let height = Pop.clientHeight;
          let width = Pop.clientWidth;
          Pop.style.marginLeft = -width / 2 + "px";
          Pop.style.marginTop = -height / 2 + "px";
          // 关闭
          this.close();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}

.tips {
  position: fixed;
  top: 50%;
  left: 50%;
}
.animation {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.shake {
  animation-name: shake;
}

.content {
  background: rgba($color: #000000, $alpha: 0.6);
  color: #fff;
  border-radius: 5px;
  padding: 15px 20px;
}
</style>