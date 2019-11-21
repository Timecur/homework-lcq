<template>
  <div>
    <iframe :src="url" frameborder="0" class="by-iframe" :class="styleClsss" ref="iframe"></iframe>
  </div>
</template>

<script>

export default {
  name: 'by-iframe',
  props: {
    url: {
      default: '',
      type: String,
    },
    styleClsss: {
      default: '',
      type: String,
    },
    sendCookie: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      iframe: {},
    }
  },
  watch: {
    sendCookie(newValue) {
      if (newValue === true) {
        this.handleSendCookie()
      }
    },
  },
  mounted() {
    this.iframe = this.$refs.iframe.contentWindow
  },
  methods: {
    handleSendCookie() {
      this.iframe.postMessage({
        cmd: 'sendCookies',
        params: {
          data: document.cookie,
        },
      }, '*')
    },
  },
}
</script>

<style lang="scss" scoped>
.by-iframe {
  height: 100vh;
  width: 100%;
}
</style>
