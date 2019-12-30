<template>
  <div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'auth',
  computed: {
    ...mapGetters([
      'roles',
    ]),
  },
  mounted() {
    if (this.roles.includes('admin')) {
      this.$router.replace('/')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      const role = this.roles[0]
      this.$router.replace(`/${role}`)
    }
  },
}
</script>
