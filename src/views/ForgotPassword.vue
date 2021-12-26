<template>
  <div class="position-relative">
    <Modal v-if="modalActive" @closeModal="closeModal" :modalMessage="modalMessage" />
    <Loading v-if="loading" />
    <div class="reset vh-100 d-flex justify-content-center align-items-center">
      <div class="reset-container text-center rounded-3">
        <h1 class="reset-title mb-4">Reset Password</h1>
        <div class="reset-form">
          <form>
            <div class="mb-3">
              <p>Forgot your password? Enter your email to reset it</p>
            </div>
            <div class="mb-3">
              <input type="email" class="form-control form-control-lg" placeholder="E-mail" v-model="email">
            </div>
            <div class="mb-5">
              <button class="btn btn-primary btn-lg w-100 sign-in" @click.prevent="reset">Reset</button>
            </div>
          </form>
        </div>
        <div class="login">
          <span>Back to</span>
          <router-link class="link" :to="{ name: 'Login'}">Login</router-link>
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
.reset {
  background-color: #e9faff;

  .reset-container {
    background-color: #fff;
    width: 500px;
    padding: 50px;

    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);

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
}
</style>