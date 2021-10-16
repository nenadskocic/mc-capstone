<template>
  <div>
    <div class="jumbotron text-center">
      <b-row>
        <h4 id="signIn">Sign In</h4>
      </b-row>
      <b-row>
        <b-col sm="3">
          <label>Email:</label>
        </b-col>
        <b-col sm="8">
          <b-input type="email" class="form-control form-control-md" />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="3">
          <label>Password:</label>
        </b-col>
        <b-col sm="8">
          <b-input type="password" class="form-control form-control-md" />
        </b-col>
      </b-row>
      <b-row id="submitBtn">
        <b-button type="submit" class="btn btn-dark btn-lg btn-block">
          Send
        </b-button>
      </b-row>
      <b-row>
        <router-link to="/signup" id="signUpLink"
          >Don't have account? Click here.</router-link
        >
      </b-row>
    </div>
  </div>
</template>

<script>
</script>

<style>
.login {
  position: relative;
  height: 100vh;
}
.jumbotron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: gray;
}
</style>