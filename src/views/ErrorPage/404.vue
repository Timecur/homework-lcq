<template>
  <div class="by-not-found">
    <div class="by-not-found--top">
      <img class="not-found-animate" :src="gifBg" alt="">
    </div>
    <div class="by-not-found--bottom">
      <h1>Page Not Found</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: '404',
  computed: {
    gifBg() {
      const baseUrl = process.env.BASE_URL
      return `${baseUrl}images/404-animate.gif`
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.by-not-found {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  & .by-not-found--top {
    width: 100%;
    height: 50vh;
    padding-top: 10vh;
    box-sizing: border-box;
    & .not-found-animate {
      height: 40vh;
      display: block;
      margin: 0 auto;
    }
  }
  & .by-not-found--bottom {
    width: 100%;
    height: 50vh;
    box-sizing: border-box;
    background-color: #234D60;
    & h1 {
      margin: 0;
      text-align: center;
      color: #ffffff;
      line-height: 8vh;
      font-size: 50px;
    }
    & .goback-btn {
      width: 100vw;
      margin: 0 auto;
      & button {
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
