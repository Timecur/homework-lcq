<template>
  <div
    class="by-tab-pane"
    v-if="(!lazy || loaded) || active"
    v-show="active"
    role="tabpanel"
    :aria-hidden="!active"
    :id="`pane-${paneName}`"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ByTabPane',

  componentName: 'ByTabPane',

  props: {
    label: String,
    labelContent: Function,
    name: String,
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean,
    tabClassName: String,
  },

  data() {
    return {
      index: null,
      loaded: false,
    }
  },

  computed: {
    isClosable() {
      return this.closable || this.$parent.closable
    },
    active() {
      const active = this.$parent.currentName === (this.name || this.index)
      return active
    },
    paneName() {
      return this.name || this.index
    },
  },

  watch: {
    active(val) {
      if (val) {
        this.loaded = true
      }
    },
    label() {
      this.$parent.$forceUpdate()
    },
  },
}
</script>
