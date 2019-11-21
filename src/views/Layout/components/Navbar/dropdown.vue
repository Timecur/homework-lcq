<template>
  <el-dropdown class="avatar-container right-menu-item">
    <div class="avatar-wrapper">
      {{userName}}
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item divided>
        <span style="display:block;" @click="logout">登出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

export default {
  name: 'dropdown',
  data() {
    return {
    }
  },
  computed: {
    userName() {
      const name = this.$store.getters.name || '伴鱼'
      return name
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        window.location.reload()
      })
    },
  },
  created() {
    this.$store.dispatch('GetUserInfo')
  },
}
</script>

<style lang="scss" scoped>
.avatar-container {
  height: 50px;
  margin-right: 30px;
  color: #fff;
  .avatar-wrapper {
    cursor: pointer;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
