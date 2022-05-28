<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #FF5722;"
      >去签到</a>
    </div>
    <list-item :lists="lists" :isShow="false"></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'top',
  data () {
    return {
      page: 0,
      limit: 20,
      lists: [
        {
          uid: {
            name: 'imooc',
            isVip: 1
          },
          title: '大前端课程',
          content: '',
          created: '2019-10-01 01:00:00',
          catalog: 'ask',
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 1,
          tags: [
            {
              name: '精华',
              class: 'layui-bg-red'
            },
            {
              name: '热门',
              class: 'layui-bg-blue'
            }
          ]
        }
      ]
    }
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>
</style>
