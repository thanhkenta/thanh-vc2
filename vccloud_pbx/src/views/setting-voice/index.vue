<template>
  <div class="app-container">
    Cai dat tong dai
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'permission',
    data() {
      return {
        switchRoles: ''
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    watch: {
      switchRoles(val) {
        this.$store.dispatch('ChangeRoles', val).then(() => {
          this.$router.push({ path: '/permission/index?' + +new Date() })
        })
      }
    }
  }
</script>
