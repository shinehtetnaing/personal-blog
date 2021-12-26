<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid mx-3">
      <router-link class="navbar-brand" to="/">Personal Blog</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'About' }">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Blog' }">Blogs</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link class="nav-link" :to="{ name: 'CreateBlog' }">Create Post</router-link>
          </li>
          <li class="nav-item" v-if="!user">
            <router-link class="nav-link" :to="{ name: 'Login' }">Login / Register</router-link>
          </li>
          <li class="nav-item dropdown" v-if="user" @click="showDropDown" ref="profile">
            <div class="nav-link profile" >
              <span>{{ this.$store.state.profileInitials }}</span>
            </div>
            <ul class="dropdown-menu" v-if="dropDown">
              <li>
                <div class="text-center">
                  {{ this.$store.state.profileFirstName + ' ' + this.$store.state.profileLastName }}
                </div>
              </li>
              <li><div class="text-center">{{ this.$store.state.profileEmail }}</div></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown-item" :to="{ name: 'Profile' }">Profile</router-link></li>
              <li><div class="dropdown-item" @click.prevent="signOut">Sign out</div></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"

export default {
  name: 'Navigation',
  data() {
    return {
      dropDown: false,
    }
  },
  methods: {
    showDropDown(e) {
      if (e.target === this.$refs.profile) {
        this.dropDown = !this.dropDown
      }
    },
    signOut() {
      const auth = getAuth()
      signOut(auth).then(() => {
        window.location.reload()
      }).catch((e) => {
        console.log(e.message)
      })
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdown {
    background-color: #000;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    
    .profile {
      color: #fff !important;
      pointer-events: none;
    }
    
    .dropdown-menu {
      display: block;
      right: 0;
      top: 50px;

      .dropdown-item {
        cursor: pointer;
      }
    }
  }
</style>
