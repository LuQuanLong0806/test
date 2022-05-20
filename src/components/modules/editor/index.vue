<template>
  <div class="layui-form layui-form-pane p-relative">
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">
        <span ref="face" class="icon-item" @click="faceStatus = true">
          <i class="iconfont icon-biaoqing"></i>
        </span>
        <span ref="imgUpload" class="icon-item" @click="imgStatus = true">
          <i class="iconfont icon-tupian"></i>
        </span>
        <span class="icon-item">
          <i class="iconfont icon-lianjie"></i>
        </span>

        <span class="icon-item">
          <i class="iconfont icon-quote"></i>
        </span>
        <span class="icon-item"> <i class="iconfont icon-hr"></i> </span
        ><span class="icon-item">
          <i class="iconfont icon-icon_yulan"></i>
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

    <Face
      :isShow="faceStatus"
      @on-face="selectFace"
      @on-close="faceStatus = false"
      :ctrl="$refs.face"
    ></Face>
    <ImgUpload
      :ctrl="$refs.imgUpload"
      :isShow="imgStatus"
      @on-close="imgStatus = false"
    ></ImgUpload>
  </div>
</template>

<script>
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'
export default {
  name: 'editor',
  components: {
    Face,
    ImgUpload,
  },
  data() {
    return {
      faceStatus: false,
      imgStatus: true,
    }
  },
  methods: {
    selectFace(value) {
      this.faceStatus = false
      console.log('value', value)
    },
  },
}
</script>

<style  lang="scss">
@import './../../../assets/custom/iconfont.css';

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0.5;
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}

.faed-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.edit-content {
  position: absolute;
  top: 40px;
  left: 0;
}
</style>
<style lang="scss" scoped>
.p-relative {
  position: relative;
}
.face-container {
  position: absolute;
  top: 40px;
  left: 0;
}
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