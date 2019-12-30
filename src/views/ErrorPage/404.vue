<template>
  <div class="by-not-found">
    <div class="by-not-found--top">
      <img class="not-found-animate" :src="gifBg" alt="">
    </div>
    <div class="by-not-found--bottom">
      <h1>Page Not Found</h1>
      <a href="http://localhost:9960/homework-lcq/home/my-target">
        <button class="return">返回首页</button>
      </a>
      <!-- v-on:监听 DOM 事件，并在触发时运行一些 JavaScript 代码 -->
    </div>
  </div>
</template>

<script>
// /* esline-disabled */
export default {
  name: '404',
  computed: {
    gifBg() {
      const baseUrl = process.env.BASE_URL
      return `${baseUrl}images/404-animate.gif`
    },
  },
  methods: {
    warn(message, event) {
      // 现在我们可以访问原生事件对象
      if (event) event.preventDefault()
      alert(message)
    },
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
    position: relative;
    width: 100%;
    height: 50vh;
    box-sizing: border-box;
    background-color: rgb(62, 143, 180);
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
  .return{
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    background-color: rgba(62, 110, 212, 0.801);
    color: white;
    font-size: 16px;
    margin: 4px 2px;
    border: none;
    display: inline-block;
    position: absolute;
    right: 48%;
    bottom: 70%;
  }
  .return:hover {
    background-color: #4CAF50;
    color: white;
}
}
</style>
