<template>
  <div id="loginPage">
    <div class="jumbotron text-center">
      <b-row>
        <h4>Sign In</h4>
      </b-row>
      <b-form>
        <b-row>
          <b-col sm="3">
            <label>Username:</label>
          </b-col>
          <b-col sm="8">
            <b-input
              type="text"
              class="form-control form-control-md"
              v-model="username"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Password:</label>
          </b-col>
          <b-col sm="8">
            <b-input
              type="password"
              class="form-control form-control-md"
              v-model="password"
            />
          </b-col>
        </b-row>
        <b-row id="submit">
          <b-button
            type="submit"
            class="btn btn-dark btn-lg btn-block"
            @click="login"
          >
            Submit
          </b-button>
        </b-row>
      </b-form>
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
const axios = require("axios");

export default {
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    async login() {
      try {
        let user = {
          username: this.username,
          password: this.password,
        };
        await axios.post("http://localhost:3000/login", user).then((res) => {
          if (res.status === 200) {
            console.log("succeeded");
            this.$router.push("/admin/userProfiles");
          } else {
            console.log("false");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
#loginPage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px));
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
  background-color: rgb(254, 155, 59);
  color: black;
}
.row #securityLink {
  color: black !important;
  padding: 40px 60px 20px 0;
  text-align: right;
}
</style>