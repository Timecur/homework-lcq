<template>
  <div class="home">
    <img alt="Vue logo" :src="logo">

    <div class="hello">
      <h1>{{ msg }}</h1>
      <p>
        本项目是基于vue-cli3所设计的<br>
        以下是文档
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli 文档</a>.
      </p>
      <h3>相关链接</h3>
      <ul>
        <li><a href="https://vuejs.org" target="_blank" rel="noopener">vue 文档</a></li>
      </ul>
      <h3>生态文档</h3>
      <ul>
        <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
        <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
        <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
        <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
        <li><a href="https://fontawesome.com/" target="_blank" rel="noopener">fontawesome</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      msg: '欢迎来到伴鱼中后台脚手架',
    }
  },
  computed: {
    logo() {
      const baseUrl = process.env.BASE_URL
      return `${baseUrl}images/logo.jpg`
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
