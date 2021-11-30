<template>
  <div id="truckProfPage">
    <div id="top">
      <h1>Driver Profiles</h1>
      <div id="innerTop">
        <b-form>
          <b-row>
            <b-col sm="2">
              <label>Driver First Name:</label>
            </b-col>
            <b-col sm="2">
              <b-input
                type="text"
                class="form-control form-control-md"
                v-model="searchName"
              />
            </b-col>
            <b-col sm="2">
              <label>Status:</label>
            </b-col>
            <b-col sm="2" id="type">
              <b-select
                type="text"
                class="form-control form-control-md"
                v-model="selectStatus"
              >
                <option></option>
                <option value="Active">Active</option>
                <option value="Terminated">Terminated</option>
              </b-select>
            </b-col>
            <b-col sm="4">
              <b-button class="btn btn-dark btn-lg btn-block" id="createBtn"
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
              <b-th>{{ header.hFName }}</b-th>
              <b-th>{{ header.hLName }}</b-th>
              <b-th>{{ header.hEmail }}</b-th>
              <b-th>{{ header.hHomeNumb }}</b-th>
              <b-th>{{ header.hCellNumb }}</b-th>
              <b-th>{{ header.hStatus }}</b-th>
              <b-th>Details</b-th>
              <b-th>Delete</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(driver, index) in filteredDrivers"
              v-bind:key="index.page"
            >
              <b-td>{{ driver.user_id }}</b-td>
              <b-td>
                <div>
                  {{ driver.first_name }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ driver.last_name }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ driver.user_email }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ driver.home_phone }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ driver.cell_phone }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ driver.status }}
                </div>
              </b-td>

              <b-td class="view">
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="details"
                  @click="detailsDriver(driver)"
                  >Details</b-button
                >
              </b-td>
              <b-td>
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="delete"
                  @click="delDriver(driver)"
                  >Delete</b-button
                >
              </b-td>
            </b-tr>
          </b-tbody>
        </table>
      </div>
      <div v-if="detailsFlag">
        <div id="left">
          <b-form-fieldset>
            <table>
              <b-row>
                <b-col sm="4">
                  <label>First Name:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="first_name"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Last Name:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="last_name"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Email:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="email"
                    class="form-control form-control-md"
                    v-model="user_email"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Home No:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="home_phone"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Cell No:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="cell_phone"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>SIN No:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="sin_number"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>License No:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="license_number"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Status:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="status"
                  />
                </b-col>
              </b-row>
            </table>
          </b-form-fieldset>
        </div>
        <div id="right">
          <b-form-fieldset>
            <table>
              <b-row>
                <b-col sm="3">
                  <label>Street No:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="street_number"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>Street Name:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="street_name"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>City:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="email"
                    class="form-control form-control-md"
                    v-model="city"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>Province:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="province"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>Postal Code:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="postal_code"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>Country:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="country"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="8">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="cancelBtn"
                    @click="rmDetails"
                    >Cancel</b-button
                  >
                </b-col>
              </b-row>
            </table>
          </b-form-fieldset>
        </div>
      </div>
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
          hFName: "First Name",
          hLName: "Last Name",
          hEmail: "Email",
          hSIN: "SIN",
          hLicense: "License No.",
          hHomeNumb: "Home No.",
          hCellNumb: "Cell No.",
          hStatus: "Status",
        },
      ],
      searchName: "",
      selectStatus: "",
      detailsFlag: false,
      first_name: "",
      editedDriver: [],
    };
  },
  computed: {
    ...mapState(["drivers"]),
    ...mapGetters(["allDrivers"]),

    filteredDrivers: function () {
      return this.allDrivers
        .filter(this.searchByName)
        .filter(this.selectByStatus);
    },
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["fetchDrivers", "updateDriver", "deleteDriver"]),

    searchByName(driver) {
      if (this.searchName.length === 0) {
        return true;
      }
      return (
        driver.first_name.toLowerCase().indexOf(this.searchName.toLowerCase()) >
        -1
      );
    },
    selectByStatus(driver) {
      if (this.selectStatus.length === 0) {
        return true;
      }
      return driver.status.indexOf(this.selectStatus) > -1;
    },
    delDriver(driver) {
      this.deleteDriver(driver);
      window.location = "/admin/profile/truck";
    },
    detailsDriver(driver) {
      this.detailsFlag = true;

      this.user_id = driver.user_id;
      this.first_name = driver.first_name;
      this.last_name = driver.last_name;
      this.user_email = driver.user_email;
      this.sin_number = driver.sin_number;
      this.license_number = driver.license_number;
      this.home_phone = driver.home_phone;
      this.cell_phone = driver.cell_phone;
      this.status = driver.status;
      this.street_number = driver.street_number;
      this.street_name = driver.street_name;
      this.city = driver.city;
      this.province = driver.province;
      this.postal_code = driver.postal_code;
      this.country = driver.country;
    },
    async saveEditedDriver() {
      let edited_f_n = this.first_name;
      let edited_l_n = this.last_name;
      let edited_u_m = this.user_email;
      let edited_s_n = this.sin_number;
      let edited_lic_n = this.license_number;
      let edited_h_p = this.home_phone;
      let edited_c_p = this.cell_phone;
      let edited_s = this.status;
      let e_user_id = this.user_id;

      let editedDriver = [
        {
          first_name: edited_f_n,
          last_name: edited_l_n,
          user_email: edited_u_m,
          sin_number: edited_s_n,
          license_number: edited_lic_n,
          home_phone: edited_h_p,
          cell_phone: edited_c_p,
          status: edited_s,
          user_id: e_user_id,
        },
      ];
      await axios.put("http://localhost:3000/driver/2", editedDriver);
    },
    rmDetails() {
      this.detailsFlag = false;
    },
  },
  created() {
    this.fetchDrivers();
  },
};
</script>

<style scoped>
#truckProfPage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px + 25px));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
#innerTop input,
select {
  height: 48px;
  padding: 0;
}
#innerTop option {
  text-align: center;
}
.col-sm-2 label {
  vertical-align: -webkit-baseline-middle;
}
.btn {
  color: black;
}
#middle {
  height: 30;
}
#bottom {
  height: 55%;
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
  padding: 16px;
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
  margin-right: 5px;
}
#details {
  background-color: lightblue;
}
#delete,
#cancelBtn {
  background-color: lightcoral;
}
#cancelBtn {
  margin-left: 150px !important;
}
h4 {
  text-align: middle;
  font-size: 26px;
  color: black;
  padding: 20px 0 0 32px;
}
#bottom {
  height: 85%;
}
fieldset {
  padding: 30px;
}
#left table,
#right table {
  width: 100%;
}
#left,
#right {
  display: inline-block;
  height: 425px;
  margin-top: 100px;
  width: 50%;
}
#left label,
#right label {
  float: right;
}
#left input,
#right input {
  margin: 5px;
}
#left {
  border-width: 2px 0 2px 0;
  border-style: solid;
  color: black;
}
#right {
  border-width: 2px 0px 2px 0;
  border-style: solid;
  color: black;
}
#right button {
  margin: 40px 317px 0 0;
}
</style>