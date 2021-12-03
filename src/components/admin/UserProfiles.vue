/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div id="userProfPage">
    <div id="top">
      <h1>User Profiles</h1>
      <div id="innerTop">
        <b-form>
          <b-row>
            <b-col sm="1">
              <label>Username:</label>
            </b-col>
            <b-col sm="2">
              <b-input
                type="text"
                class="form-control form-control-md"
                v-model="searchUsername"
              />
            </b-col>
            <b-col sm="1">
              <label>Admin:</label>
            </b-col>
            <b-col sm="2" id="type">
              <b-select
                type="number"
                class="form-control form-control-md"
                v-model="selectType"
              >
                <option></option>
                <option value="0">0</option>
                <option value="1">1</option>
              </b-select>
            </b-col>
            <b-col sm="2">
              <label>0-False, 1-True</label>
            </b-col>
            <b-col sm="4">
              <b-button
                class="btn btn-dark btn-lg btn-block"
                id="createBtn"
                @click="showModal"
                >Create</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </div>
    </div>
    <div id="bottom">
      <div class="jumbotron text-center">
        <table class="profilesTable">
          <b-thead>
            <b-tr v-for="header in headers" v-bind:key="header.page">
              <b-th>{{ header.hID }}</b-th>
              <b-th>{{ header.hUsername }}</b-th>
              <b-th>{{ header.hType }}</b-th>
              <b-th>Edit</b-th>
              <b-th>Delete</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
              <b-tr
              v-for="(user, index) in filteredUsers"
              v-bind:key="index.page"
              :class="{ editing: user == editedUser }" v-cloak>
                <b-td>{{ user.id }}</b-td>
                <b-td >
                  <div class="view">
                      {{ user.username }}
                  </div>
                  <div class="edit">
                    <input type="text" v-model="user.username" id="editedUsernameF" />
                    <div>
                      <p id="editUsernameErrF">{{ editUsernameErr }}</p>
                    </div>
                  </div>            
                </b-td>
                <b-td>
                  <div class="view">
                    {{ user.is_admin }}
                  </div>
                  <div class="edit">
                    <b-select
                      type="number"
                      class="form-control form-control-md"
                      v-model="user.is_admin"
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </b-select>
                  </div>
                </b-td>
                <b-td class="view">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="edit"
                    @click="editUser(user)"
                    >Edit</b-button
                  >
                </b-td>
                <b-td class="edit">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="saveEditedUserBtn"
                    @click="saveEditedUser(editedUser)"
                    >Save</b-button
                  >
                </b-td>
                <b-td>
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="delete"
                    @click="delUser(user)"
                    >Delete</b-button
                  >
                </b-td>
            </b-tr>
          </b-tbody>
        </table>
      </div>
    </div>
    <div id="modal" v-if="modalVis">
      <b-row>
        <h4>Add User</h4>
      </b-row>
      <b-form id="userForm" v-model="userValid" @submit.prevent>
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
        <div class="btn-toolbar">
          <b-button
            id="submitBtn"
            class="btn btn-dark btn-lg btn-block"
            @click="addUser"
          >
            Submit
          </b-button>

          <b-button
            id="cancelBtn"
            class="btn btn-dark btn-lg btn-block"
            @click="cancel"
          >
            Cancel
          </b-button>
        </div>
        <p v-if="errors.length" id="error">
          <ul>
            <li v-for="err in errors" v-bind:key="err.page">
              {{ err }}
            </li>
          </ul>
        </p>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
const axios = require("axios");

export default {
  data() {
    return {
      headers: [
        {
          hID: "User ID",
          hUsername: "Username",
          hEmail: "Email",
          hType: "Admin",
        },
      ],
      searchUsername: "",
      selectType: "",
      userValid: false,
      modalVis: false,
      errors: [],
      fName: "",
      lName: "",
      password: "",
      editedUser: "",
      is_admin: "",
      editUsernameErr: "",
    };
  },
  computed: {
    ...mapState(["users"]),
    ...mapGetters(["allUsers"]),

    filteredUsers: function () {
      return this.allUsers
        .filter(this.searchByUsername)
        .filter(this.selectByType);
    },
    username: {
      get() {
        return `${this.fName}.${this.lName}`.toLowerCase();
      },
    },
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["fetchUsers", "updateUser", "deleteUser"]),

    searchByUsername(user) {
      if (this.searchUsername.length === 0) {
        return true;
      }
      return (
        user.username.toLowerCase().indexOf(this.searchUsername.toLowerCase()) >
        -1
      );
    },
    selectByType(user) {
      if (this.selectType.length === 0) {
        return true;
      }
      return user.is_admin.toString().indexOf(this.selectType.toString()) > -1;
    },
    delUser(user) {
      this.deleteUser(user);
    },
    showModal() {
      this.modalVis = true;
    },
    cancel() {
      this.modalVis = false;
    },
    async addUser() {
      try {
        this.errors = [];

        if (!this.fName) {
          this.errors.push("First name required!");
        }
        if (!this.lName) {
          this.errors.push("Last name required!");
        }
        if (!this.password) {
          this.errors.push("Password required!");
        }
        if (!this.errors.length) {
          let user = {
            username: this.username,
            password: this.password,
          };
          await axios
            .post("http://localhost:3000/register", user)
            .then((res) => {
              if (res.data === "Duplicate") {
                this.errors.push("Username provided already exists!");
              } else {
                this.userValid = true;
                this.modalVis = false;
                window.location = "/admin/profile/user";
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
    editUser(user) {
      this.editedUser = user;
    },
    async saveEditedUser(editedUser) {
      if (!this.editedUser.username) {
        this.editUsernameErr = "Please input a value.";
      } else {
        await axios
          .put(`http://localhost:3000/user/${editedUser.auth_id}`, editedUser)
          .then((res) => {
            if (res.data === "Duplicate") {
              this.editUsernameErr = "Duplicate!";
            } else {
              this.userValid = true;
              this.modalVis = false;
              window.location = "/admin/profile/user";
            }
          });
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
#userProfPage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px + 25px));
}
#top {
  height: 15%;
}
h1,
#innerTop {
  margin-top: 25px;
}
#innerTop .row {
  margin: 0;
}
.col-sm-1 label {
  padding: 10px;
  font-size: 20px;
  float: right;
}
.col-sm-2 label {
  padding: 10px;
  font-size: 20px;
  float: left;
}
.col-sm-2 input {
  text-align: center;
}
#innerTop input,
select {
  height: 48px;
  padding: 0;
}
#innerTop option {
  text-align: center;
}
.col-sm-1,
.col-sm-2,
.col-sm-6 {
  padding: 0;
}
.btn {
  background-color: rgb(254, 155, 59);
  color: black;
}
#bottom {
  height: 85%;
}
.jumbotron {
  margin-top: 40px;
  background-color: darkgray;
}
.profilesTable {
  width: 100%;
}
table thead,
th,
tr,
td {
  padding: 20px;
}
table thead {
  font-size: 24px;
}
table tr {
  border-top: 2px solid black !important;
}
table thead tr {
  background-color: silver !important;
}
table input,
option {
  text-align: center;
}
th:nth-child() {
  background-color: gray;
}
tr:nth-child(even) {
  background-color: silver;
}
tr:nth-child(odd) {
  background-color: whitesmoke;
}
tr.disabled {
  background-color: gray;
}
#createBtn {
  background-color: lightgreen;
  float: right;
  margin-right: 20px;
}
#edit {
  background-color: lightyellow;
}
#delete {
  background-color: lightcoral;
}
#modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 450px;
  border-style: solid;
  border-color: black;
  background-color: lightgray;
}
#addBtn {
  margin-left: 45px;
}
#submitBtn {
  margin: 20px 0 0 200px;
  background-color: lightgreen;
}
#cancelBtn {
  margin: 20px 0 0 145px;
  background-color: lightcoral;
}
#newUsernameF,
#newPassF {
  margin-left: 20px;
}
#userForm {
  margin-top: 20px;
}
.col-sm-3 label {
  float: right;
  padding: 10px 0 10px 0;
}
.col-sm-7 input {
  margin-left: 45px;
}
h4 {
  text-align: middle;
  font-size: 26px;
  color: black;
  padding: 20px 0 0 32px;
}
#error {
  color: red;
  float: right;
  margin: 40px 60px 0 0;
}
#error li {
  list-style-type: none;
}
[v-cloak] {
  display: none;
}
.edit {
  display: none;
}
.editing .edit {
  display: block;
}
.editing .view {
  display: none;
}
#editedUsernameF,
#editedTypeF {
  text-align: center;
}
#saveEditedUserBtn {
  background-color: lightgreen;
}
#editUsernameErrF {
  color: red;
  margin-bottom: 0;
}
</style>