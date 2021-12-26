<template>
  <div class="modal position-absolute d-flex justify-content-center align-items-center w-100 h-100">
    <div class="modal-container text-center rounded-3">
      <p>{{ modalMessage }}</p>
      <button class="btn btn-primary modal-btn" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalMessage'],
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  }
}
</script>

<style lang="scss" scoped>
.modal {
  background-color: rgba($color: #221c1c, $alpha: .7);

  .modal-container {
    background-color: #fff;
    width: 400px;
    padding: 40px 0;

    .modal-btn {
      text-transform: uppercase;

      &:hover {
        background-color: #333 !important;
      }
    }
  }
}
</style>