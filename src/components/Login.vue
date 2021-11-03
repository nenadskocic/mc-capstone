<template>
  <div class="loginPage">
    <div class="jumbotron text-center">
      <b-row>
        <h4>Sign In</h4>
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
      <b-row id="submit">
        <b-button type="submit" class="btn btn-dark btn-lg btn-block">
          Submit
        </b-button>
      </b-row>
      <b-row>
        <router-link
          to="/securityQuestions"
          custom
          v-slot="{ navigate }"
          exact
          :style="{ cursor: 'pointer' }"
          id="securityLink"
        >
          <span @click="navigate" @kepress.enter="navigate" role="link"
            >Forgot your password?</span
          >
        </router-link>
      </b-row>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.loginPage {
  background-color: lightgray;
  height: 79.4vh;
}
.jumbotron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  border-style: solid;
  border-color: black;
  background-color: whitesmoke;
}
h4 {
  align-items: center;
  font-size: 26px;
  color: black;
  padding-top: 20px;
}
.row {
  align-items: center;
  padding: 2.5px;
  margin: 0;
}
.col-sm-3 label {
  float: right;
}
#submit {
  margin-left: 160px;
  padding-top: 20px;
  width: 20%;
}
#submit button {
  background-color: orange;
  color: black;
}
.row #securityLink {
  color: black !important;
  padding: 40px 60px 20px 0;
  text-align: right;
}
</style>