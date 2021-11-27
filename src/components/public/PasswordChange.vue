<template>
  <div id="PwdChangePage">
    <div class="jumbotron text-center">
      <b-row>
        <h4>Change Password</h4>
      </b-row>
      <b-row>
        <p>
          Please choose a password 0-12 characters long. Must include at least 1
          uppercase character, 1 lowercase character, 1 number & 1 symbol (Ex.
          !,@,#,$).
        </p>
      </b-row>
      <b-form>
        <b-row>
          <b-col sm="3">
            <label>New Password:</label>
          </b-col>
          <b-col sm="7">
            <b-input type="password" class="form-control form-control-md" />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Re-type Password:</label>
          </b-col>
          <b-col sm="7">
            <b-input type="password" class="form-control form-control-md" />
          </b-col>
        </b-row>
        <b-row id="submit">
          <b-button type="submit" class="btn btn-dark btn-lg btn-block">
            Save
          </b-button>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
#PwdChangePage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px));
}
.jumbotron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  border-style: solid;
  border-color: black;
  background-color: whitesmoke;
}
.jumbotron p {
  text-align: left;
  padding: 0 0 0 32px;
}
h4 {
  text-align: left;
  font-size: 26px;
  color: black;
  padding: 20px 0 0 32px;
}
.row {
  align-items: center;
  padding: 2.5px;
  margin: 0;
}
.col-sm-3 label {
  float: left;
  padding: 10px 0 10px 20px;
}
.col-sm-7 input {
  margin-left: 45px;
}
#submit {
  margin-left: 257px;
  padding: 20px 0 20px 0;
  width: 20%;
}
#submit button {
  background-color: rgb(254, 155, 59);
  color: black;
}
</style>

