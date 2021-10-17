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
          Send
        </b-button>
      </b-row>
      <b-row>
        <router-link to="/signup" id="signUpLink"
          ><p>Forgot your password?</p></router-link
        >
      </b-row>
    </div>
  </div>
</template>

<script>
</script>

<style>
.loginPage {
  background-color: lightgray;
  height: 90vh;
}
.jumbotron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: white;
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
}
.col-sm-3 label {
  float: right;
}

#submit {
  margin-left: 155px;
  padding-top: 20px;
  width: 20%;
}

#submit button {
  background-color: orange;
  color: black;
}
.row #signUpLink {
  color: black !important;
  padding-top: 50px;
}
.row #signUpLink p {
  float: right;
  padding-right: 10px;
}
</style>