<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="flex msg">{{ msg }}</div>
      <div v-if="type == 'alert'" class="btnCommon success" @click="close()">
        确定
      </div>
      <div v-else class="space-around">
        <div class="btnCommon cancel" @click="cancelEvent">取消</div>
        <div class="btnCommon success" @click="successEvent">确定</div>
      </div>
    </div>
    <div class="mask" @click="closeMask"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'alert',
    },
    msg: {
      type: String,
      default: '',
    },
    success: {
      type: Function,
      default: () => {
        console.log('success~')
      },
    },
    cancel: {
      type: Function,
      default: () => {
        console.log('cancel~')
      },
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    closeMask() {
      if (this.type == 'alert') {
        this.isShow = false
      }
    },
    cancelEvent() {
      this.cancel()
      this.close()
    },
    successEvent() {
      this.success()
      this.close()
    },
  },
}
</script>

<style scoped>
.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  background-color: #fff;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  z-index: 3000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.msg {
  color: #333;
  font-size: 16px;
}
.flex {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnCommon {
  width: 105px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
}
.btnCommon:hover {
  opacity: 0.7;
}
.cancel {
  background-color: #ededed;
  color: #333;
}
.success {
  background-color: #009688;
  color: #fff;
}
.space-around {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  overflow: hidden;
}
</style>