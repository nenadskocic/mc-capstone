/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div id="clientProfPage">
    <div id="top">
      <h1>Client Profiles</h1>
      <div id="innerTop">
        <b-form>
          <b-row>
            <b-col sm="1">
              <label>Client:</label>
            </b-col>
            <b-col sm="2">
              <b-input
                type="text"
                class="form-control form-control-md"
                v-model="searchClient"
              />
            </b-col>
            <b-col sm="1">
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
            <b-col sm="1">
              <label>Type:</label>
            </b-col>
            <b-col sm="2" id="type">
              <b-select
                type="text"
                class="form-control form-control-md"
                v-model="selectType"
              >
                <option></option>
                <option value="Importer">Importer</option>
                <option value="Exporter">Exporter</option>
              </b-select>
            </b-col>
            <b-col sm="3">
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
              <b-th>{{ header.h1 }}</b-th>
              <b-th>{{ header.h2 }}</b-th>
              <b-th>{{ header.h3 }}</b-th>
              <b-th>{{ header.h4 }}</b-th>
              <b-th>{{ header.h5 }}</b-th>
              <b-th>Details</b-th>
              <b-th>Delete</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(client, index) in filteredClients"
              v-bind:key="index.page"
            >
              <b-td>{{ client.client_id }}</b-td>
              <b-td>
                <div>
                  {{ client.client_name }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ client.client_phone_no }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ client.client_type }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ client.client_status }}
                </div>
              </b-td>
              <b-td>
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="detailsBtn"
                  @click="detailsClient(client)"
                  >Details</b-button
                >
              </b-td>
              <b-td>
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="deleteBtn"
                  @click="delClient(client)"
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
                  <label>Client Name:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="client_name"
                    disabled
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Phone No:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="client_phone_no"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Type:</label>
                </b-col>
                <b-col sm="7">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="client_type"
                  >
                    <option value="Importer">Importer</option>
                    <option value="Exporter">Exporter</option>
                  </b-select>
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
                    v-model="client_status"
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
                  <label>Province/State:</label>
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
                  <label>Postal Code/ZIP:</label>
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
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="country"
                  >
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                  </b-select>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="5">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="saveEditedBtn"
                    @click="saveEditedClient"
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
          <h4>Add Client</h4>
        </b-row>
        <div id="modalLeft">
          <b-form-fieldset>
            <table>
              <b-row>
                <b-col sm="4">
                  <label>Client Name:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_client_name"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Phone No:</label>
                </b-col>
                <b-col sm="8">
                  <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_client_phone_no"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Type:</label>
                </b-col>
                <b-col sm="8">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="n_client_type"
                  >
                    <option value="Importer">Importer</option>
                    <option value="Exporter">Exporter</option>
                  </b-select>
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
                    v-model="n_client_status"
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
                    @click="createClient"
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
          h1: "Client ID",
          h2: "Client Name",
          h3: "Phone No.",
          h4: "Type",
          h5: "Status",
        },
      ],
      searchClient: "",
      selectStatus: "",
      selectType: "",
      detailsFlag: false,
      client_name: "",

      modalVis: false,
      n_client_name: "",
      n_client_phone_no: "",
      n_client_type: "",
      n_client_status: "",
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
    ...mapState(["clients"]),
    ...mapGetters(["allClients"]),

    filteredClients: function () {
      return this.allClients
        .filter(this.searchByClient)
        .filter(this.selectByType)
        .filter(this.selectByStatus);
    },
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["fetchClients", "updateClient", "deleteClient"]),

    searchByClient(client) {
      if (this.searchClient.length === 0) {
        return true;
      }
      return (
        client.client_name
          .toLowerCase()
          .indexOf(this.searchClient.toLowerCase()) > -1
      );
    },
    selectByType(client) {
      if (this.selectType.length === 0) {
        return true;
      }
      return client.client_type.indexOf(this.selectType) > -1;
    },
    selectByStatus(client) {
      if (this.selectStatus.length === 0) {
        return true;
      }
      return client.client_status.indexOf(this.selectStatus) > -1;
    },
    delClient(client) {
      this.deleteClient(client);
      window.location = "/admin/profile/client";
    },
    detailsClient(client) {
      this.detailsFlag = true;

      this.client_id = client.client_id;
      this.client_name = client.client_name;
      this.client_phone_no = client.client_phone_no;
      this.client_type = client.client_type;
      this.client_status = client.client_status;

      this.client_address_id = client.client_address_id;
      this.street_number = client.street_number;
      this.street_name = client.street_name;
      this.city = client.city;
      this.province = client.province;
      this.postal_code = client.postal_code;
      this.country = client.country;
    },
    async saveEditedClient() {
      let e_client_id = this.client_id;
      let edited_c_n = this.client_name;
      let edited_c_p_n = this.client_phone_no;
      let edited_c_t = this.client_type;
      let edited_c_s = this.client_status;

      let edited_client_id = this.client_address_id;
      let edited_street_no = this.street_number;
      let edited_street_name = this.street_name;
      let edited_city = this.city;
      let edited_province = this.province;
      let edited_postal_code = this.postal_code;
      let edited_country = this.country;

      let editedClient = [
        {
          client_id: e_client_id,
          client_name: edited_c_n,
          client_phone_no: edited_c_p_n,
          client_type: edited_c_t,
          client_status: edited_c_s,
        },
      ];

      let editedClientAddress = [
        {
          street_number: edited_street_no,
          street_name: edited_street_name,
          city: edited_city,
          province: edited_province,
          postal_code: edited_postal_code,
          country: edited_country,
          client_id: e_client_id,
          client_address_id: edited_client_id,
        },
      ];

      const axios1 = axios.put(
        `http://159.65.218.19:3000/client/${editedClient[0].client_id}`,
        editedClient
      );
      const axios2 = axios.put(
        `http://159.65.218.19:3000/client_address/${editedClientAddress[0].client_address_id}`,
        editedClientAddress
      );

      await axios.all([axios1, axios2]).then(() => {
        window.location = "/admin/profile/client";
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
    async createClient() {
      if (
        !this.n_client_name ||
        !this.n_client_phone_no ||
        !this.n_street_number ||
        !this.n_street_name ||
        !this.n_city ||
        !this.n_province ||
        !this.n_postal_code ||
        !this.n_country
      ) {
        this.modalErrors = "Empty fields!";
      } else {
        let newClient = {
          client_name: this.n_client_name,
          client_phone_no: this.n_client_phone_no,
          client_type: this.n_client_type,
          client_status: this.n_client_status,
        };
        let newClientAddress = {
          street_number: this.n_street_number,
          street_name: this.n_street_name,
          city: this.n_city,
          province: this.n_province,
          postal_code: this.n_postal_code,
          country: this.n_country,
        };

        await axios
          .post("http://159.65.218.19:3000/client", newClient)
          .then((res) => {
            if (res.data === "Duplicate") {
              this.modalErrors = "Data used by other user!";
            } else {
              axios.post(
                "http://159.65.218.19:3000/client_address",
                newClientAddress
              );
              window.location = "/admin/profile/client";
            }
          });
      }
    },
  },
  created() {
    this.fetchClients();
  },
};
</script>

<style scoped>
/** ---------- PAGE ---------------- */
#clientProfPage {
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
#innerTop select {
  height: 48px;
  padding: 0;
}
#innerTop option {
  text-align: center;
}
.col-sm-1 label {
  vertical-align: -webkit-baseline-middle;
  padding-top: 7.5px;
  font-size: 20px;
  float: right;
}
.col-sm-2 input {
  text-align: center;
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
  margin: 20px 0 0 260px !important;
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