<template>
  <div class="profile vh-100 d-flex justify-content-center align-items-center">
    <div class="profile-container bg-light rounded-3">
      <h1 class="profile-title text-center mb-5">My Profile</h1>
      <div class="row mb-3">
        <div class="col-4">
          <label class="profile-label">First Name:</label>
        </div>
        <div class="col-8">
          {{ this.$store.state.profileFirstName }}
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-4">
          <label class="profile-label">Last Name:</label>
        </div>
        <div class="col-8">
          {{ this.$store.state.profileLastName }}
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-4">
          <label class="profile-label">Email:</label>
        </div>
        <div class="col-8">
          {{ this.$store.state.profileEmail }}
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary btn-md edit-profile" disabled>Edit Profile</button>
        <button class="btn btn-primary btn-md change-password" disabled>Change Password</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
}
</script>

<style lang="scss" scoped>
.profile {
  .profile-container {
    width: 500px;
    padding: 50px;

    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  }

  .profile-label {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>