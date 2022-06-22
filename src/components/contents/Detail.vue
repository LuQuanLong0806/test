<template>
  <div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8 content detail">
          <div class="fly-panel detail-box">
            <h1>{{ detail.title }}</h1>
            <div class="fly-detail-info">
              <!-- <span class="layui-badge">审核中</span> -->
              <span class="layui-badge layui-bg-green fly-detail-column"
                >动态</span
              >

              <span class="layui-badge" style="background-color: #999"
                >未结</span
              >
              <!-- <span class="layui-badge" style="background-color: #5FB878;">已结</span> -->

              <span class="layui-badge layui-bg-black">置顶</span>
              <span class="layui-badge layui-bg-red">精帖</span>

              <div class="fly-admin-box" data-id="123">
                <span class="layui-btn layui-btn-xs jie-admin" type="del"
                  >删除</span
                >

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="1"
                  >置顶</span
                >
                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="status"
                  rank="1"
                  >加精</span
                >
                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
              </div>
              <span class="fly-list-nums">
                <a href="#comment"
                  ><i class="iconfont" title="回答">&#xe60c;</i> 66</a
                >
                <i class="iconfont" title="人气">&#xe60b;</i> {{ detail.reads }}
              </span>
            </div>
            <div class="detail-about">
              <a class="fly-avatar" href="../user/home.html">
                <img :src="detail.uid ? detail.uid.pic : ''" alt="" />
              </a>
              <div class="fly-detail-user">
                <a href="../user/home.html" class="fly-link">
                  <cite>{{ detail.uid ? detail.uid.nickname : "" }}</cite>

                  <template
                    v-if="
                      detail.uid && detail.uid.isVip && detail.uid.isVip != 0
                    "
                  >
                    <i class="iconfont icon-renzheng" title="认证信息"></i>
                    <i class="layui-badge fly-badge-vip"
                      >VIP{{ detail.uid.isVip }}</i
                    >
                  </template>
                </a>
                <span>{{ detail.created | dateFormat }}</span>
              </div>
              <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
                <span style="padding-right: 10px; color: #ff7200"
                  >悬赏：{{ detail.fav }}积分</span
                >
              </div>
            </div>

            <div class="collection-container">
              <span
                style="color: #c00"
                v-if="detail.isCollect == 1"
                @click="collect(0)"
              >
                <i class="layui-icon layui-icon-star-fill"></i>
                已收藏
              </span>
              <span @click="collect(1)" v-else>
                <i class="layui-icon layui-icon-star"></i>
                收藏
              </span>
            </div>
            <div class="detail-body photos">
              {{ detail.content }}
            </div>
          </div>

          <div class="fly-panel detail-box" id="flyReply">
            <fieldset
              class="layui-elem-field layui-field-title"
              style="text-align: center"
            >
              <legend>评论</legend>
            </fieldset>

            <ul class="jieda" v-if="commentsList.length > 0">
              <li
                v-for="(item, index) in commentsList"
                :key="'comments' + index"
                class="jieda-daan"
              >
                <a name="item-1111111111"></a>
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar" href="">
                    <img :src="item.cuid ? item.cuid.pic : ''" alt=" " />
                  </a>
                  <div class="fly-detail-user">
                    <a href="" class="fly-link">
                      <cite>{{ item.cuid ? item.cuid.nickname : "" }}</cite>

                      <template v-if="item.cuid.isVip && item.cuid.isVip != 0">
                        <i
                          class="iconfont icon-renzheng"
                          title="认证信息："
                        ></i>
                        <i class="layui-badge fly-badge-vip"
                          >VIP{{ item.cuid ? item.cuid.isVip : "" }}</i
                        >
                      </template>
                    </a>

                    <!-- <span >(楼主)</span> -->
                    <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                -->
                  </div>

                  <div class="detail-hits">
                    <span>{{
                      item.created | dateFormat("YYYY-MM-DD HH:mm:ss")
                    }}</span>
                  </div>

                  <i
                    class="iconfont"
                    :class="{ 'icon-caina': item.isBest == 1 }"
                    title="最佳答案"
                  ></i>
                </div>
                <div class="detail-body jieda-body photos">
                  <p>{{ item.content }}</p>
                </div>
                <div class="jieda-reply">
                  <!--  zanok  点赞的class -->
                  <span
                    class="jieda-zan"
                    type="zan"
                    @click="setHands(item, index)"
                  >
                    <i
                      class="iconfont icon-zan"
                      :class="{ zanok: item.handed == 1 }"
                    ></i>
                    <em>{{ item.hands }}</em>
                  </span>
                  <span type="reply" @click="replay(item)">
                    <i class="iconfont icon-svgmoban53"></i>
                    回复
                  </span>
                  <div class="jieda-admin">
                    <!-- 本人才能编辑删除 -->
                    <span
                      type="edit"
                      @click="editComment(item, index)"
                      v-if="
                        item.isBest != 1 &&
                        detail.isEnd != 1 &&
                        item.cuid &&
                        userInfo._id &&
                        item.cuid._id == userInfo._id
                      "
                      >编辑</span
                    >
                    <span
                      type="del"
                      v-if="
                        item.isBest != 1 &&
                        item.cuid &&
                        userInfo._id &&
                        item.cuid._id == userInfo._id
                      "
                      @click="delComment(item, index)"
                      >删除</span
                    >
                    <!-- 楼主才可以采纳 -->
                    <span
                      class="jieda-accept"
                      type="accept"
                      @click="setBest(item, index)"
                      v-if="
                        item.isBest != 1 &&
                        detail.uid &&
                        detail.uid._id == userInfo._id
                      "
                      >采纳</span
                    >
                  </div>
                </div>
              </li>
            </ul>
            <!-- 无数据时 -->
            <li v-else class="fly-none">消灭零回复</li>

            <div
              class="layui-form layui-form-pane"
              id="commentsInput"
              ref="commentsInput"
              v-if="detail.isEnd != 1"
            >
              <form action="/jie/reply/" method="post">
                <div class="layui-form-item layui-form-text">
                  <a name="comment"></a>
                  <div class="layui-input-block">
                    <textarea
                      v-model="commentObj.content"
                      placeholder="请输入内容"
                      class="layui-textarea fly-editor"
                      style="height: 150px"
                    ></textarea>
                  </div>
                </div>
                <div class="layui-form-item">
                  <input type="hidden" name="jid" value="123" />
                  <button
                    class="layui-btn"
                    type="button"
                    @click="submitComment"
                  >
                    提交回复
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="layui-col-md4">
          <!-- 本周热议 -->
          <dl class="fly-panel fly-list-one">
            <dt class="fly-panel-title">本周热议</dt>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>

            <!-- 无数据时 -->
            <!--
        <div class="fly-none">没有相关数据</div>
        -->
          </dl>

          <div class="fly-panel" style="padding: 20px 0; text-align: center">
            <img src="" style="max-width: 100%" alt="layui" />
            <p style="position: relative; color: #666">
              微信扫码关注 layui 公众号
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail, collect } from "@/api/contents";
import {
  getComments,
  addComment,
  updateComment,
  setBest,
  setHands,
} from "@/api/contents/comments";
import { scrollToElem } from "@/util/common";
export default {
  name: "detail",
  data() {
    return {
      detail: {},
      total: 0,
      commentsList: [],
      commentObj: {
        content: "", // 评论内容
        code: "", // 验证码
      },
      editInfo: {},
      editIndex: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.login.userInfo || {};
    },
  },

  created() {
    this.getDetail();
    this.getComments();
  },
  mounted() {},

  methods: {
    submitComment() {
      if (!this.editInfo._id) {
        let params = {
          ...this.commentObj,
          tid: this.$route.query.id,
        };
        addComment(params).then((res) => {
          if (res.code == 200) {
            Object.keys(this.commentObj).forEach((d) => {
              this.commentObj[d] = "";
            });
            this.getComments();
          }
          this.$pop(res.message);
        });
      } else {
        // 编辑
        this.updateComment();
      }
    },
    getComments() {
      let params = {
        tid: this.$route.query.id,
        page: "",
        limit: "",
      };
      getComments(params).then((res) => {
        if (res.code == 200) {
          this.commentsList = res.data;
          this.total = res.total;
        } else {
          this.$alert(res.message);
        }
      });
    },

    getDetail() {
      getDetail({ tid: this.$route.query.id }).then((res) => {
        if (res.code == 200) {
          this.detail = res.data;
        } else {
          this.$alert(res.message);
        }
      });
    },

    // 编辑
    editComment(item, index) {
      let elem = this.$refs.commentsInput;
      let container = document.querySelector(".roter-view");
      // 滚动到输入框的位置
      scrollToElem(elem, 800, -82, container);
      // elem.focus() // 自动聚焦
      this.editInfo = item;
      this.editIndex = index;
    },
    // 更新评论
    updateComment() {
      // 发送编辑评论请求
      let params = {
        // content: '测试更改数据',
        ...this.commentObj,
        id: this.editInfo._id,
        cuid: this.userInfo._id,
      };
      updateComment(params).then((res) => {
        // 返回更新的数据内容
        this.$pop(res.message);
        // 前端更新
        if (res.code == 200) {
          this.$set(this.commentsList, this.editIndex, {
            ...this.commentsList[this.editIndex],
            content: params.content,
          });

          Object.keys(this.commentObj).forEach((d) => {
            this.commentObj[d] = "";
          });

          this.editInfo = {};
          this.editIndex = -1;
        }
      });
    },

    // 删除
    delComment(item, index) {
      console.log(item, index);
    },
    // 采纳
    setBest(item, index) {
      this.$confirm("确定设置为最佳答案吗?", () => {
        setBest({
          tid: this.$route.query.id,
          cid: item._id,
        }).then((res) => {
          this.$pop(res.message);
          if (res.code == 200) {
            // 帖子状态要完结
            this.detail.isEnd = 1;
            this.$set(this.commentsList, index, { ...item, isBest: 1 });
          }
        });
      });
    },
    // 点赞

    setHands(item, index) {
      if (!this.$store.state.login.token) {
        this.$pop("请先登录!");
        return;
      }
      setHands({ cid: item._id }).then((res) => {
        this.$pop(res.message);
        if (res.code == 200) {
          this.commentsList[index].hands += 1;
          this.commentsList[index].handed = 1;
        }
      });
    },

    //  回复
    replay(item) {
      console.log("回复", item);
      if (!this.$store.state.login.token) {
        this.$pop("请先登录!");
        return;
      }
    },

    // 收藏

    collect(i) {
      if (!this.$store.state.login.token) {
        this.$pop("请先登录!", "shake");
        return;
      }
      let params = {
        tid: this.$route.query.id,
        uid: this.userInfo._id,
        title: this.detail.title,
      };
      if (i == 1) {
        params.isCollect = 1;
        // 收藏
        collect(params).then((res) => {
          this.$pop(res.message);
          if (res.code == 200) {
            this.$set(this.detail, "isCollect", 1);
          }
        });
      } else {
        params.isCollect = 0;
        // 取消收藏
        this.$confirm("是否取消收藏?", () => {
          collect(params).then((res) => {
            this.$pop(res.message);
            if (res.code == 200) {
              this.$set(this.detail, "isCollect", 0);
            }
          });
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.layui-badge {
  margin-right: 5px;
}
.layui-btn-xs {
  margin-right: 5px;
}
.detail-body {
  min-height: 100px;
}
.fly-none {
  min-height: auto;
  padding: 30px 0;
}
.layui-container {
  padding-top: 20px;
}
.layui-icon-star-fill {
  color: #c00;
}
.collection-container {
  text-align: right;
  padding: 10px 0 0;
  span {
    cursor: pointer;
  }
}
</style>