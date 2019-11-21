<template>
  <div class="by-part">
    <div class="title">
      <span class="prefix">|</span> {{title}}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'by-part',
  props: {
    title: String,
  },
}
</script>

<style lang="scss" scoped>
.by-part {
  position: relative;
}
.title {
  font-weight: 500;
  margin-bottom: 20px;
  margin-top: 20px;
  .prefix {
    color: #FF9903;
  }
}
</style>
