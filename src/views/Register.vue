<template>
  <div class="register vh-100 d-flex justify-content-center align-items-center">
    <div class="register-container text-center rounded-3">
      <h1 class="register-title mb-4">Register</h1>
      <div class="error mb-3" v-if="error">{{ errorMsg }}</div>
      <div class="register-form">
        <form>
          <div class="mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="First Name" v-model="firstName">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="Last Name" v-model="lastName">
          </div>
          <div class="mb-3">
            <input type="email" class="form-control form-control-lg" placeholder="E-mail" v-model="email">
          </div>
          <div class="mb-3">
            <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password">
          </div>
          <div class="mb-5">
            <button class="btn btn-primary btn-lg w-100 sign-up" @click.prevent="register">Sign up</button>
          </div>
        </form>
      </div>
      <div class="login">
        <span>Already have an account?</span>
        <router-link class="link" :to="{ name: 'Login'}">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 

export default {
  name: 'Register',
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: null,
      errorMsg: ""
    }
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== ""
      ) {
        this.error = false
        this.errorMsg = ""

        const auth = await getAuth()
        const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const result = await createUser
        const db = getFirestore()
        await setDoc(doc(db, "users", result.user.uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        
        this.$router.push({ name: 'Home' })
        return
      }
      console.log('false')
      this.error = true
      this.errorMsg = "Please fill out all the fields!"
      return
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  background-color: #e9faff;

  .register-container {
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

    .register-form {
      .sign-up {
        text-transform: uppercase;

        &:hover {
          background-color: #333 !important;
        }
      }
    }

    .login {
      .link {
        text-decoration: none;
        margin: 0 5px;
      }
    }
  }
}
</style>