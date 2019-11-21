<template>
  <div class="navbar">
    <div class="left-menu" v-if="sidebar.opened">
      <p class="title">
        vue-okr大作业
      </p>
    </div>

    <hamburger
      @toggleClick="toggleSideBar"
      :is-active="sidebar.opened"
      id="hamburger-container"
      class="hamburger-container"/>

    <div class="right-menu">
      <tell-status></tell-status>
      <dropdown></dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Dropdown from './dropdown'
import TellStatus from './tell-status'

export default {
  name: 'navbar',
  components: {
    Hamburger,
    Dropdown,
    TellStatus,
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: $menuBg;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  .hamburger-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu {
    float: left;
    height: 100%;
    .title {
      width: 180px;
      font-size: 30px;
      line-height: 50px;
      text-align: center;
      margin: 0;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    margin-right: 20px;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
  }
}
</style>
