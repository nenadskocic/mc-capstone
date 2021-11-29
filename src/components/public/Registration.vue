<template>
  <div class="registrationPage">
    <div class="jumbotron text-center">
      <b-row>
        <h4>Registration</h4>
      </b-row>
      <b-form v-model="regValid" @submit.prevent>
        <b-row>
          <b-col sm="3">
            <label>First Name:</label>
          </b-col>
          <b-col sm="7">
            <b-input
              type="text"
              class="form-control form-control-md"
              v-model="fName"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Last Name:</label>
          </b-col>
          <b-col sm="7">
            <b-input
              type="text"
              class="form-control form-control-md"
              v-model="lName"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Username:</label>
          </b-col>
          <b-col sm="7">
            <b-input
              type="text"
              class="form-control form-control-md"
              v-model="username"
              disabled
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Password:</label>
          </b-col>
          <b-col sm="7">
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
            @click="register"
          >
            Submit
          </b-button>
        </b-row>
      </b-form>
      <p v-if="error.length" id="error">
          <ul>
            <li v-for="err in error" v-bind:key="err.page">
              {{ err }}
            </li>
          </ul>
      </p>
      <b-row>
        <router-link
          to="/public/login"
          custom
          v-slot="{ navigate }"
          exact
          :style="{ cursor: 'pointer' }"
          id="homeLink"
          replace
        >
          <span @click="navigate" @kepress.enter="navigate" role="link"
            >Go back to Home</span
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
    fName: "",
    lName: "",
    password: "",
    regValid: false,
    error: [],
  }),
  computed: {
    username: {
      get() {
        return `${this.fName}.${this.lName}`.toLowerCase();
      },
    },
  },
  methods: {
    async register() {
      try {
        this.error = [];
        let type = "general";

        if (!this.fName) {
          this.error.push("First name required!");
        }
        if (!this.lName) {
          this.error.push("Last name required!");
        }
        if (!this.password) {
          this.error.push("Password required!");
        }
        if (!this.error.length) {
          let user = {
            username: this.username,
            password: this.password,
            type: type,
          };
          await axios
            .post("http://localhost:3000/register", user)
            .then((res) => {
              if (res.data === "Duplicate") {
                this.error.push("Username provided already exists!");
              } else {
                this.regValid = true;
                this.$router.push("/public/login");
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.registrationPage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px));
}
.jumbotron {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 450px;
  border-style: solid;
  border-color: black;
  background-color: whitesmoke;
}
.jumbotron p {
  text-align: left;
  padding: 0 0 0 32px;
}
h4 {
  text-align: middle;
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
  margin-left: 232px;
  padding: 20px 0 20px 0;
  width: 20%;
}
#submit button {
  background-color: rgb(254, 155, 59);
  color: black;
}
.row #homeLink {
  color: rgb(254, 155, 59) !important;
  margin-top: 45px;
  text-align: left;
}
#error {
  color: red;
  float: right;
  margin-right: 84px;
}
#error li {
  list-style-type: none;
}
</style>