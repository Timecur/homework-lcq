<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  name: 'by-breadcrumb',
  data() {
    return {
      // levelList: null,
      breadList: [],
      // 路由集合
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta.title)
      const first = matched[0]
      if (first && first.name.trim().toLocaleLowerCase() !== 'Sale'.toLocaleLowerCase()) {
        matched = [{ path: '/home', meta: { title: '' } }].concat()
        // meta:定义了与文档相关联的名称/值对
        // 返回一个数组，包含当前路由的所有嵌套路径片段的路由记录。
      }

      this.levelList = matched.filter(item => item.meta
        && item.meta.title
        && item.meta.breadcrumb !== false)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 20px;
    line-height: 50px;
    margin-left: 9px;
    .no-redirect {
      color: #01060c;
      font-weight: 900;
      cursor: text;
    }
  }
</style>
