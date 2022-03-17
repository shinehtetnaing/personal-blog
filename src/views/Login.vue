<template>
  <div class="d-flex">
    <div class="login-bg">
      <img src="@/assets/img/login.jpg" alt="login_background">
    </div>
    <div class="login d-flex align-items-center p-5">
      <div class="login-container text-center">
        <h1 class="login-title mb-4">Login</h1>
        <div class="error mb-4" v-if="error">{{ errorMsg }}</div>
        <div class="login-form p-3">
          <form>
            <div class="mb-4">
              <input type="email" class="form-control form-control-lg" placeholder="E-mail" v-model="email">
            </div>
            <div class="mb-4">
              <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password">
            </div>
            <div class="mb-4">
              <button class="btn btn-primary btn-lg w-100 sign-in" @click.prevent="login">Sign in</button>
            </div>
          </form>
        </div>
        <div class="reset-sign-up p-3">
          <div class="mb-2">
            <router-link class="link" :to="{ name: 'ForgotPassword' }">Forgot password?</router-link>
          </div>
          <div>
            <span>Create an account?</span>
            <router-link class="link" :to="{ name: 'Register'}">Sign up</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: ""
    }
  },
  methods: {
    login() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        this.$router.push({ name: 'Home' })
        this.error = false
        this.errorMsg = ""
        console.log(auth.currentUser, 'logged in')
      })
      .catch((err) => {
        this.error = true
        this.errorMsg = err.message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-bg {
  flex: 1 1 50%;

  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
.login {
  flex: 1 1 50%;
  background-color: #e9faff;

  .login-container {
    width: 70%;
    margin: 0 auto;
  }

  .error {
    color: red;
  }

  .login-form {
    .sign-in {
      text-transform: uppercase;

      &:hover {
        background-color: #333 !important;
      }
    }
  }

  .reset-sign-up {
    .link {
      text-decoration: none;
      margin: 0 5px;
    }
  }
}

@media (max-width: 1024px) {
  .login-bg {
    display: none;
  }

  .login {
    flex: auto;
  }
}
</style>
