<template>
  <div class="position-relative">
    <Modal v-if="modalActive" @closeModal="closeModal" :modalMessage="modalMessage" />
    <Loading v-if="loading" />
    <div class="d-flex">
      <div class="reset-bg">
        <img src="@/assets/img/forgot_password.jpg" alt="forgot_password_background">
      </div>
      <div class="reset d-flex align-items-center p-5">
        <div class="reset-container text-center">
          <h1 class="reset-title mb-4">Reset Password</h1>
          <div class="reset-form p-3">
            <form>
              <div class="mb-4">
                <p>Forgot your password? Enter your email to reset it</p>
              </div>
              <div class="mb-4">
                <input type="email" class="form-control form-control-lg" placeholder="E-mail" v-model="email">
              </div>
              <div class="mb-4">
                <button class="btn btn-primary btn-lg w-100 sign-in" @click.prevent="reset">Reset</button>
              </div>
            </form>
          </div>
          <div class="login p-3">
            <span>Back to</span>
            <router-link class="link" :to="{ name: 'Login'}">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'ForgotPassword',
  components: { Modal, Loading },
  data() {
    return {
      email: '',
      modalActive: false,
      modalMessage: '',
      loading: null
    }
  },
  methods: {
    reset() {
      this.loading = true
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
      .then(() => {
        this.modalMessage = 'If your account exits, you will receive an email'
        this.loading = false
        this.modalActive = true
      })
      .catch((err) => {
        this.modalMessage = err.message;
        this.loading = false
        this.modalActive = true
      });
    },
    closeModal() {
      this.modalActive = !this.modalActive,
      this.email = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-bg {
  flex: 1 1 50%;

  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
.reset {
  flex: 1 1 50%;
  background-color: #e9faff;

  .reset-container {
    width: 70%;
    margin: 0 auto;
  }

  .error {
    color: red;
  }

  .reset-form {
    .reset {
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
</style>