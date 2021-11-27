<template>
  <div id="userProfPage">
    <div id="top">
      <h1>User Profiles</h1>
      <div class="innerTop">
        <b-form>
          <b-row>
            <b-col sm="1">
              <label>User ID:</label>
            </b-col>
            <b-col sm="1">
              <b-input
                type="number"
                class="form-control form-control-md"
                disabled
              />
            </b-col>
            <b-col sm="1">
              <label>First Name:</label>
            </b-col>
            <b-col sm="2">
              <b-input type="text" class="form-control form-control-md" />
            </b-col>
            <b-col sm="1">
              <label>Last Name:</label>
            </b-col>
            <b-col sm="2">
              <b-input type="text" class="form-control form-control-md" />
            </b-col>
            <b-col sm="1">
              <label>User Type:</label>
            </b-col>
            <b-col sm="1" id="type">
              <b-select type="text" class="form-control form-control-md" />
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
            >
              <b-td>{{ user.auth_id }}</b-td>
              <b-td>{{ user.username }}</b-td>
              <b-td>{{ user.type }}</b-td>
              <b-td>
                <b-button
                  type="submit"
                  class="btn btn-dark btn-lg btn-block"
                  id="edit"
                  :disabled="isAdmin"
                  >Edit</b-button
                >
              </b-td>
              <b-td>
                <b-button
                  type="submit"
                  class="btn btn-dark btn-lg btn-block"
                  id="delete"
                  :disabled="isAdmin"
                  >Delete</b-button
                >
              </b-td>
            </b-tr>
          </b-tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      headers: [
        {
          hID: "User ID",
          hUsername: "Username",
          hEmail: "Email",
          hType: "Type",
        },
      ],
      isAdmin: false,
    };
  },
  computed: {
    ...mapState(["users"]),
    ...mapGetters(["allUsers"]),

    filteredUsers: function () {
      return this.allUsers;
    },
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["fetchUsers"]),
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
.innerTop {
  margin-top: 25px;
}
.innerTop .row {
  margin: 0;
}
.col-sm-1 label {
  padding: 10px 0;
}
.innerTop input,
select {
  height: 48px;
  padding: 0;
}
.col-sm-1,
.col-sm-2 {
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
  margin-top: 2%;
  background-color: darkgray;
}
.profilesTable {
  width: 100%;
}
table thead {
  font-size: 24px;
}
</style>