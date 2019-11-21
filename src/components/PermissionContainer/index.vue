<template>
  <div v-if="isShow">
    <slot></slot>
  </div>
</template>

<script>
import { hasPermission } from '@/utils/tools'

export default {
  name: 'permission-container',
  props: {
    roleList: {
      type: Array,
      default: () => [],
    },
    userRoles: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isShow() {
      return hasPermission(this.roleList, this.userRoles)
    },
  },
}
</script>
