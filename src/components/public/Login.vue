/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div id="loginPage">
    <div class="jumbotron text-center">
      <b-row>
        <h4>Sign In</h4>
      </b-row>
      <b-form @submit.prevent>
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
        <p id="error">{{ error }}</p>
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
          replace
        >
          <span @click="navigate" @keypress="navigate" role="link"
            >Forgot your password?</span
          >
        </router-link>
        <router-link
          to="/registration"
          custom
          v-slot="{ navigate }"
          exact
          :style="{ cursor: 'pointer' }"
          id="registerLink"
        >
          <span @click="navigate" @keypress.enter="navigate" role="link"
            >New user? Register here</span
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
    error: "",
  }),
  methods: {
    login() {
      try {
        let user = {
          username: this.username,
          password: this.password,
        };
        axios.post("http://159.65.218.19:3000/login", user).then((res) => {
          let is_admin = res.data.authUser[0].is_admin;

          localStorage.setItem("authUser", JSON.stringify(res.data.authUser));
          localStorage.setItem("jwt", res.data.token);

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");

            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              if (is_admin == 1) {
                this.$router.push("/admin/profile/user").catch(() => {});
              } else {
                this.$router.push("/user/dispatch").catch(() => {});
              }
            }
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
form {
  margin-bottom: 20px;
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
  padding: 20px 60px 0 0;
  text-align: right;
}
.row #registerLink {
  color: rgb(254, 155, 59) !important;
  padding: 5px 60px 20px 0;
  text-align: right;
}
#error {
  float: right;
  margin-top: 5px;
  margin-right: 65px;
  color: red;
}
</style>