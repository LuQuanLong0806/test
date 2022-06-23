<template>
  <div class="bgc">
    <Tabs :tabs="tabList" :on-change="changeTab" :index="current">
      <TabItem>
        <ul>
          <li class="d-flex-between">
            <span>title</span>
            <span>time</span>
          </li>
        </ul>
      </TabItem>
      <TabItem>
        <table class="layui-table" align="center">
          <colgroup>
            <col width="80" />
            <col width="280" />
            <col width="180" />
            <col width="120" />
            <col width="120" />
            <col width="150" />
          </colgroup>
          <thead>
            <th>排序</th>
            <th>标题</th>
            <th>收藏时间</th>
            <th>类型</th>
            <th>状态</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in collectList" :key="index + 'collect'">
              <td>
                {{ (collectPage.page - 1) * collectPage.limit + index + 1 }}
              </td>
              <td style="text-align: left">
                {{ item.title }}
              </td>
              <td>{{ item.created }}</td>
              <td>类型</td>
              <td>状态</td>
              <td>
                <button
                  class="layui-btn layui-btn-sm"
                  type="button"
                  @click="
                    $router.push({ path: '/detail', query: { id: item.tid } })
                  "
                >
                  查看
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </TabItem>
    </Tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
import TabItem from "@/components/Tabs/TabItem";

import { getCollectPosts } from "@/api/user";

export default {
  components: {
    Tabs,
    TabItem,
  },
  name: "MyPosts",
  data() {
    return {
      tabList: [
        { name: "我发表的贴", value: 0 },
        { name: "我收藏的贴", value: 1 },
      ],
      collectList: [],
      collectPage: {
        page: 1,
        limit: 10,
      },
    };
  },
  computed: {
    current() {
      return this.$route.query.tab ? Number(this.$route.query.tab) : 0;
    },
  },
  created() {
    // this.current = this.$route.query.tab ? this.$route.query.tab : 0;
    if (this.current == 1) {
      this.getCollectPosts();
    } else {
      // 我发表的
    }
  },
  methods: {
    changeTab(item) {
      console.log(item);
      //   我发表的
      if (item.value == 0) {
        //
      } else {
        // 我收藏的
        this.getCollectPosts();
      }
    },
    getCollectPosts() {
      let params = {
        ...this.collectPage,
      };
      getCollectPosts(params).then((res) => {
        if (res.code == 200) {
          this.collectList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bgc {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  min-height: 100vh;
}
.overfllow-font {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
[align="center"] th,
[align="center"] td {
  text-align: center;
}
</style>