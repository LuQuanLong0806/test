<template>
  <div>
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li
          :class="{ 'layui-this': tabs === index }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="toggleTab(item, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- 内容 -->
    <ul class="active-list" v-if="tabs == 0">
      <li
        class="d-flex active-list-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="active-list-pic" :src="item.pic" alt="" />
        <div class="active-list-name font-orange">{{ item.nickname }}</div>
        <div class="active-list-days font-gray">签到于{{ item.time }}</div>
      </li>
    </ul>

    <ul class="active-list" v-if="tabs == 1">
      <li
        class="d-flex active-list-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="active-list-pic" :src="item.pic" alt="" />
        <div class="active-list-name font-orange">{{ item.nickname }}</div>
        <div class="active-list-days font-gray">签到于{{ item.time }}</div>
      </li>
    </ul>

    <ul class="active-list" v-if="tabs == 2">
      <li
        class="d-flex active-list-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="active-list-pic" :src="item.pic" alt="" />
        <div class="active-list-name font-orange">{{ item.nickname }}</div>
        <div class="active-list-days font-gray">
          已经连续签到 <span class="font-orange">{{ item.days }}</span
          >天
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'active-list',
  data() {
    return {
      list: [
        {
          pic: require('@/assets/user/avatar.jpg'),
          nickname: '1lusfql',
          days: 10,
          time: '2021-4-15 12:43:04',
        },
        {
          pic: require('@/assets/user/avatar.jpg'),
          nickname: '12luqlsfds',
          days: 10,
          time: '2022-5-15 15:43:04',
        },
        {
          pic: require('@/assets/user/avatar.jpg'),
          nickname: 'luqlsadfas',
          days: 10,
          time: '2021-5-15 20:43:20',
        },
        {
          pic: require('@/assets/user/avatar.jpg'),
          nickname: 'luql1fs2',
          days: 10,
          time: '2022-5-28 00:23:36',
        },
        {
          pic: require('@/assets/user/avatar.jpg'),
          nickname: 'luql1',
          days: 10,
          time: '2022-5-21 10:34:28',
        },
      ],
      tabs: 0,
      tabList: [
        { name: '最新签到', value: 0 },
        { name: '今日最快', value: 1 },
        { name: '总签到榜', value: 2 },
      ],
    }
  },

  methods: {
    toggleTab(item, i) {
      this.tabs = i
    },
  },
}
</script>

<style lang="scss" scoped>
.active-list {
  overflow: hidden;
  &-item {
    margin: 10px 0;
  }
  &-pic {
    height: 38px;
    width: 38px;
  }
  &-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80px;
    font-size: 14px;
    margin: 0 8px;
  }
  &-days {
    width: calc(100% - 134px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>