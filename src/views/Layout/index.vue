<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <by-navbar/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <by-breadcrumb class="breadcrumb-container"/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ByBreadcrumb from '@/components/ByBreadcrumb'

import { Sidebar, AppMain, ByNavbar } from './components'
import ResizeMixin from './mixins/ResizeHandler'

export default {
  name: 'layout',
  mixins: [ResizeMixin],
  components: {
    ByBreadcrumb,
    Sidebar,
    AppMain,
    ByNavbar,
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.breadcrumb-container {
  margin-left: 20px !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  float: left;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
