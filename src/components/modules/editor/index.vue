<template>
  <div class="layui-form layui-form-pane p-relative">
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label" ref="iconContainer">
        <span
          v-for="(v, i) in iconList"
          :key="i"
          class="icon-item"
          @click="choose(i)"
        >
          <i class="layui-icon" :class="v.icon"></i>
        </span>
      </label>
      <div class="layui-input-block">
        <textarea
          ref="editArea"
          type="text"
          name="price_min"
          placeholder=""
          autocomplete="off"
          class="layui-input"
          style="min-height: 200px"
          @focus="focusEvent()"
          @blur="blurEvent()"
          v-model="content"
        />
      </div>
    </div>
    <!-- 编辑器容器 -->
    <div ref="editContainer">
      <Face
        :isShow="currentModel === 0"
        @on-face="addFace"
        @on-close="currentModel = ''"
      ></Face>
      <ImgUpload
        :isShow="currentModel === 1"
        @on-close="currentModel = ''"
        @on-submit="addImg"
      ></ImgUpload>

      <Link
        @on-submit="addLink"
        :isShow="currentModel === 2"
        @on-close="currentModel = ''"
      ></Link>

      <Quote
        @on-submit="addLink"
        :isShow="currentModel === 3"
        @on-close="currentModel = ''"
      ></Quote>

      <Code
        @on-submit="addCode"
        :isShow="currentModel === 4"
        @on-close="currentModel = ''"
      ></Code>

      <Preview
        :isShow="currentModel === 6"
        @on-close="currentModel = ''"
        :content="content"
      ></Preview>
    </div>
  </div>
</template>

<script>
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'
import Link from './Link.vue'
import Quote from './Quote.vue'
import Code from './Code.vue'
import Preview from './Preview.vue'

export default {
  name: 'editor',
  components: {
    Face,
    ImgUpload,
    Link,
    Quote,
    Code,
    Preview,
  },
  data() {
    return {
      currentModel: '',
      iconList: [
        { name: '', icon: 'layui-icon-face-smile-b' }, // 表情
        { name: '', icon: 'layui-icon-picture' }, //图片
        { name: '', icon: 'layui-icon-link' }, // 链接
        { name: '', icon: 'iconfont icon-quote' }, // 引用
        { name: '', icon: 'layui-icon-fonts-code' }, // 添代码
        { name: '', icon: 'iconfont  icon-hr' }, // 添加hr
        { name: '', icon: ' layui-icon-about' }, // 预览
      ],
      pos: '',
      content: '',
    }
  },
  mounted() {
    document
      .querySelector('body')
      .addEventListener('click', this.handleClickBody)
  },
  methods: {
    preview() {},
    // 添加表情
    addFace(val) {
      const insertContent = `face${val.key}`
      this.insert(insertContent)
    },
    // 添加图片
    addImg(val) {
      const insertContent = `img[${val}]`
      this.insert(insertContent)
    },
    // 添加链接
    addLink(val) {
      const insertContent = `a(${val})[${val}]`
      this.insert(insertContent)
    },
    // 添加引用
    addQuote(val) {
      const insertContent = `\n[quote]\n${val}\n[/quote]`
      this.insert(insertContent)
    },
    // 添加代码
    addCode(val) {
      const insertContent = `\n[pre]\n${val}\n[/pre]`
      this.insert(insertContent)
    },
    // 添加hr
    addHr() {
      this.insert('\n[hr]', 5)
    },
    // 重新计算光标位置
    focusEvent() {
      this.getPos()
    },
    blurEvent() {
      this.getPos()
    },
    // 计算光标的当前位置
    getPos() {
      let cursorPos = 0
      let elem = this.$refs.editArea
      if (document.selection) {
        // 针对IE浏览器
        let selectRange = document.selection.createRange()
        selectRange.moveStart('character', elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart == '0') {
        cursorPos = elem.selectionStart
      }

      this.pos = cursorPos
    },
    // 插入事件
    insert(val, len = null) {
      if (typeof this.content === 'undefined' || !val) {
        return
      } else {
        let tmp = this.content.split('')
        tmp.splice(this.pos, 0, val)
        this.content = tmp.join('')
      }
      if (!len) {
        this.pos += val.length
      } else {
        this.pos += len
      }
      // 关闭
      this.currentModel = ''
    },

    //
    choose(i) {
      this.currentModel = i
    },

    // 选中表情
    selectFace(value) {
      this.faceStatus = false
      console.log('value', value)
    },

    // 关闭弹出框
    handleClickBody(e) {
      // 点击非icon组件之外的地方 隐藏内容
      if (
        !this.$refs.iconContainer.contains(e.target) &&
        !this.$refs.editContainer.contains(e.target)
      ) {
        this.currentModel = ''
      }
    },
  },

  beforeDestroy() {
    document
      .querySelector('body')
      .removeEventListener('click', this.handleClickBody)
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
  z-index: 1000;
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
  cursor: pointer;
  &:hover {
    color: #009688;
  }
  padding: 0 10px;
  .iconfont {
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
  }
}
</style>