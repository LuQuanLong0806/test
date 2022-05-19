<template>
  <div class="bgc">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px">
        <!--<div class="fly-none">没有权限</div>-->
        <ValidationObserver ref="ob" v-slot="{ validate }">
          <div class="layui-form layui-form-pane">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
              <ul class="layui-tab-title">
                <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
              </ul>
              <div
                class="layui-form layui-tab-content"
                id="LAY_ucm"
                style="padding: 20px 0"
              >
                <div class="layui-tab-item layui-show">
                  <form action="" method="post">
                    <div class="layui-row layui-col-space15 layui-form-item">
                      <div class="layui-col-md3">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <select
                            lay-verify="required"
                            name="class"
                            lay-filter="column"
                          >
                            <option></option>
                            <option value="0">提问</option>
                            <option value="99">分享</option>
                            <option value="100">讨论</option>
                            <option value="101">建议</option>
                            <option value="168">公告</option>
                            <option value="169">动态</option>
                          </select>
                        </div>
                      </div>
                      <div class="layui-col-md9">
                        <label for="L_title" class="layui-form-label"
                          >标题</label
                        >
                        <div class="layui-input-block">
                          <input
                            type="text"
                            id="L_title"
                            name="title"
                            required
                            lay-verify="required"
                            autocomplete="off"
                            class="layui-input"
                          />
                          <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                        </div>
                      </div>
                    </div>

                    <Editor></Editor>

                    <div class="layui-form-item">
                      <div class="layui-inline">
                        <label class="layui-form-label">悬赏飞吻</label>
                        <div class="layui-input-inline" style="width: 190px">
                          <select name="experience">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                          </select>
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          发表后无法更改飞吻
                        </div>
                      </div>
                    </div>

                    <div class="layui-form-item">
                      <label class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <ValidationProvider
                          name="capchat"
                          rules="required"
                          v-slot="{ errors }"
                          ref="capchat"
                        >
                          <input
                            type="text"
                            name="capchat"
                            v-model="formData.capchat"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                            :class="{ 'form-group-error': false }"
                          />
                          <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div
                        class="layui-form-mid layui-word-aux"
                        style="margin-top: -20px"
                      >
                        <span @click="getCaptcha()" v-html="svg"></span>
                      </div>
                    </div>

                    <div class="layui-form-item">
                      <button
                        @click="validate().then(submit)"
                        class="layui-btn"
                        type="button"
                      >
                        立即发布
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import captchaMixin from '@/mixin/captchaMixin'
import Editor from '@/components/modules/editor'
export default {
  name: 'Add',
  components: { Editor },
  data() {
    return {
      formData: {
        captcha: '',
      },
    }
  },
  mixins: [captchaMixin],
  methods: {
    submit() {},
  },
}
</script>

<style lang="scss" scoped>
.bgc {
  background-color: #fff;
  margin: 20px 50px 0;
}
</style>