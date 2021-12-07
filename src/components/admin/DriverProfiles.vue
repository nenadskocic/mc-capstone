/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div id="driverProfPage">
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
                <option value="Inactive">Inactive</option>
              </b-select>
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
              <b-td>
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="detailsBtn"
                  @click="detailsDriver(driver)"
                  >Details</b-button
                >
              </b-td>
              <b-td>
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="deleteBtn"
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
                    disabled
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
                    disabled
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
                    type="tel"
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
                    type="tel"
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
                    disabled
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
                    disabled
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Status:</label>
                </b-col>
                <b-col sm="7">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="status"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </b-select>
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
                    type="number"
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
                    type="text"
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
                    disabled
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="5">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="saveEditedBtn"
                    @click="saveEditedDriver"
                    >Save</b-button
                  >
                </b-col>
                <b-col sm="4">
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
      <div id="modal" v-if="modalVis">
        <b-row>
          <h4>Add Driver</h4>
        </b-row>
        <div id="modalLeft">
          <b-form-fieldset>
            <table>
              <b-row>
                <b-col sm="4">
                  <label>First Name:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_first_name"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Last Name:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_last_name"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Email:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="email"
                    class="form-control form-control-md"
                    v-model="n_user_email"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Home No:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="tel"
                    class="form-control form-control-md"
                    v-model="n_home_phone"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Cell No:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="tel"
                    class="form-control form-control-md"
                    v-model="n_cell_phone"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>SIN No:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_sin_number"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>License No:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_license_number"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Status:</label>
                </b-col>
                <b-col sm="8">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_status"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </b-select>
                </b-col>
              </b-row>
            </table>
          </b-form-fieldset>
        </div>
        <div id="modalRight">
          <b-form-fieldset>
            <table>
              <b-row>
                <b-col sm="4">
                  <label>Street No:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="n_street_number"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Street Name:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_street_name"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>City:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_city"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Province:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_province"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Postal Code:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_postal_code"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Country:</label>
                </b-col>
                <b-col sm="8">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_country"
                  >
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                  </b-select>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="1">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="createModalBtn"
                    @click="createDriver"
                    >Submit</b-button
                  >
                </b-col>
                <b-col sm="2">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="cancelModalBtn"
                    @click="rmModal"
                    >Cancel</b-button
                  >
                </b-col>
              </b-row>
            </table>
            <div id="modalErr">
              {{ modalErrors }}
            </div>
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

      modalVis: false,
      n_first_name: "",
      n_last_name: "",
      n_user_email: "",
      n_home_phone: "",
      n_cell_phone: "",
      n_sin_number: "",
      n_license_number: "",
      n_status: "",
      n_street_number: "",
      n_street_name: "",
      n_city: "",
      n_province: "",
      n_postal_code: "",
      n_country: "",
      modalErrors: "",
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
      window.location = "/admin/profile/driver";
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

      this.address_id = driver.address_id;
      this.street_number = driver.street_number;
      this.street_name = driver.street_name;
      this.city = driver.city;
      this.province = driver.province;
      this.postal_code = driver.postal_code;
      this.country = driver.country;
    },
    async saveEditedDriver() {
      let e_user_id = this.user_id;
      let edited_f_n = this.first_name;
      let edited_l_n = this.last_name;
      let edited_u_m = this.user_email;
      let edited_s_n = this.sin_number;
      let edited_lic_n = this.license_number;
      let edited_h_p = this.home_phone;
      let edited_c_p = this.cell_phone;
      let edited_s = this.status;

      let edited_user_id = this.address_id;
      let edited_street_no = this.street_number;
      let edited_street_name = this.street_name;
      let edited_city = this.city;
      let edited_province = this.province;
      let edited_postal_code = this.postal_code;
      let edited_country = this.country;

      let editedDriver = [
        {
          user_id: e_user_id,
          first_name: edited_f_n,
          last_name: edited_l_n,
          user_email: edited_u_m,
          sin_number: edited_s_n,
          license_number: edited_lic_n,
          home_phone: edited_h_p,
          cell_phone: edited_c_p,
          status: edited_s,
        },
      ];

      let editedDriverAddress = [
        {
          street_number: edited_street_no,
          street_name: edited_street_name,
          city: edited_city,
          province: edited_province,
          postal_code: edited_postal_code,
          country: edited_country,
          user_id: e_user_id,
          address_id: edited_user_id,
        },
      ];

      const axios1 = axios.put(
        `http://159.65.218.19:3000/driver/${editedDriver[0].user_id}`,
        editedDriver
      );
      const axios2 = axios.put(
        `http://159.65.218.19:3000/driver_address/${editedDriverAddress[0].address_id}`,
        editedDriverAddress
      );

      await axios.all([axios1, axios2]).then(() => {
        window.location = "/admin/profile/driver";
      });
    },
    rmDetails() {
      this.detailsFlag = false;
    },
    showModal() {
      this.modalVis = true;
    },
    rmModal() {
      this.modalVis = false;
    },
    async createDriver() {
      if (
        !this.n_first_name ||
        !this.n_last_name ||
        !this.n_user_email ||
        !this.n_home_phone ||
        !this.n_cell_phone ||
        !this.n_sin_number ||
        !this.n_license_number ||
        !this.n_status ||
        !this.n_street_number ||
        !this.n_street_name ||
        !this.n_city ||
        !this.n_province ||
        !this.n_postal_code ||
        !this.n_country
      ) {
        this.modalErrors = "Empty fields!";
      } else {
        let newDriver = {
          first_name: this.n_first_name,
          last_name: this.n_last_name,
          user_email: this.n_user_email,
          home_phone: this.n_home_phone,
          cell_phone: this.n_cell_phone,
          sin_number: this.n_sin_number,
          license_number: this.n_license_number,
          status: this.n_status,
        };
        let newDriverAddress = {
          street_number: this.n_street_number,
          street_name: this.n_street_name,
          city: this.n_city,
          province: this.n_province,
          postal_code: this.n_postal_code,
          country: this.n_country,
        };

        await axios
          .post("http://159.65.218.19:3000/driver", newDriver)
          .then((res) => {
            if (res.data === "Duplicate") {
              this.modalErrors = "Data used by other user!";
            } else {
              axios.post(
                "http://159.65.218.19:3000/driver_address",
                newDriverAddress
              );
              window.location = "/admin/profile/driver";
            }
          });
      }
    },
  },
  created() {
    this.fetchDrivers();
  },
};
</script>

<style scoped>
/** ---------- PAGE ---------------- */
#driverProfPage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px + 25px));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.btn {
  color: black;
}

/** -------- TOP - FILTERS---------- */
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
  padding-top: 7.5px;
  font-size: 20px;
  float: right;
}

/** -------- BOTTOM - DATA TABLE---------- */
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
#detailsBtn {
  background-color: lightblue;
}
#deleteBtn {
  background-color: lightcoral;
}

/** -------- BOTTOM - DETAILS ---------- */
#saveEditedBtn {
  background-color: lightgreen;
  margin: 20px 0 0 190px !important;
}
#cancelBtn {
  background-color: lightcoral;
  margin: 20px 0 0 265px !important;
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
  margin-top: 50px;
  width: 50%;
  border-width: 2px 0 2px 0;
  border-style: solid;
  color: black;
}
#left label,
#right label {
  float: right;
  padding-top: 10px;
}
#left input,
#right input {
  margin: 5px;
}
#left select,
#right select {
  margin-left: 5px;
}

/** -------- MODAL ---------- */
#modal {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 850px;
  height: 600px;
  border-style: solid;
  border-color: black;
  background-color: lightgray;
}
#modal h4 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
}
fieldset {
  padding: 30px;
}
#modalLeft table,
#modalRight table {
  width: 100%;
}
#modalLeft,
#modalRight {
  display: inline-block;
  height: 425px;
  width: 50%;
}
#modalLeft label,
#modalRight label {
  float: right;
  padding-top: 10px;
}
#modalLeft input,
#modalRight input {
  margin: 5px;
}
#modalLeft select {
  margin-left: 5px;
}
#modalRight select {
  margin-left: 5px;
}
#createModalBtn {
  background-color: lightgreen;
  margin: 20px 0 0 135px;
}
#cancelModalBtn {
  background-color: lightcoral;
  margin: 20px 0 0 238px;
}
#modalErr {
  float: right;
  margin-top: 20px;
  color: red;
}
</style>