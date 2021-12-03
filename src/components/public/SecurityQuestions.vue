/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div class="securityPage">
    <div class="jumbotron text-center">
      <b-row>
        <h4>Security Questions</h4>
      </b-row>
      <b-row>
        <p>Please answer the security questions below to recover password.</p>
      </b-row>
      <b-form>
        <b-row>
          <b-col sm="3">
            <label>Security Question #1: </label>
          </b-col>
          <b-col sm="2">
            <label>Q1</label>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Answer:</label>
          </b-col>
          <b-col sm="7">
            <b-input type="text" class="form-control form-control-md" />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Security Question #2: </label>
          </b-col>
          <b-col sm="2">
            <label>Q2</label>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Answer:</label>
          </b-col>
          <b-col sm="7">
            <b-input type="text" class="form-control form-control-md" />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Security Question #3: </label>
          </b-col>
          <b-col sm="2">
            <label>Q3</label>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Answer:</label>
          </b-col>
          <b-col sm="7">
            <b-input type="text" class="form-control form-control-md" />
          </b-col>
        </b-row>
        <b-row id="submit">
          <b-button type="submit" class="btn btn-dark btn-lg btn-block">
            Submit
          </b-button>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.securityPage {
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
  float: right;
  padding: 10px 0 10px 0;
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