<template>
  <div class="login vh-100 d-flex justify-content-center align-items-center">
    <div class="login-container text-center rounded-3">
      <h1 class="login-title mb-4">Login</h1>
      <div class="error mb-3" v-if="error">{{ errorMsg }}</div>
      <div class="login-form">
        <form>
          <div class="mb-3">
            <input type="email" class="form-control form-control-lg" placeholder="E-mail" v-model="email">
          </div>
          <div class="mb-3">
            <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password">
          </div>
          <div class="mb-5">
            <button class="btn btn-primary btn-lg w-100 sign-in" @click.prevent="login">Sign in</button>
          </div>
        </form>
      </div>
      <div class="reset-sign-up">
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
.login {
  background-color: #e9faff;

  .login-container {
    background-color: #fff;
    width: 500px;
    padding: 50px;

    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);

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
}
</style>
