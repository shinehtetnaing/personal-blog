<template>
  <Navigation class="clearfix" />
  <router-view />
</template>

<script>
// @ is an alias to /src
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      this.$store.commit('updateUser', user)
      if (user) {
        this.$store.dispatch('getCurrentUser')
      }
    })
    this.$store.dispatch('getPost')
  }
}
</script>

<style lang="scss">

</style>
