<template>
  <div class="tell-status right-menu-item" v-if="loading">
    坐席：
    <span v-if="trcticlientStatus === 3">未绑定</span>
    <el-select
      class="status-select"
      size="mini"
      placeholder="请选择"
      v-else
      v-model="trcticlientStatus"
      @change="handleStatusChange"
    >
      <el-option
        v-for="item in statusOptions"
        :key="item.id"
        :label="item.label"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'tell-status',
  data() {
    return {
      statusOptions: [
        {
          id: 0,
          label: '离线',
        },
        {
          id: 1,
          label: '空闲',
        },
        {
          id: 2,
          label: '忙碌',
        },
      ],
      trcticlientStatusVal: 0,
      loading: true,
    }
  },
  computed: {
    trcticlientStatus: {
      get() {
        return this.$store.getters.trcticlientStatus
      },
      set(val) {
        this.trcticlientStatusVal = val
      },
    },
  },
  async created() {
    this.loading = false
    // await this.$store.dispatch('GetTrcticlientStatus', { vm: this })
    this.loading = true
  },
  methods: {
    async handleStatusChange() {
      switch (this.trcticlientStatusVal) {
        case 0:
          await this.$store.dispatch('SetTrcticlientStatus', { vm: this, status: 2 })
          break
        case 1:
          await this.$store.dispatch('SetTrcticlientStatus', { vm: this, status: 1 })
          break
        case 2:
          await this.$store.dispatch('SetTrcticlientStatus', { vm: this, status: 1 })
          await this.$store.dispatch('SetTrcticlientStatus', { vm: this, status: 4 })
          break
        default:
          break
      }
      await this.$store.dispatch('GetTrcticlientStatus', { vm: this })
    },
  },
}
</script>

<style lang="scss" scoped>
.tell-status {
  font-size: 14px;
}
.status-select {
  width: 80px;
}
</style>
