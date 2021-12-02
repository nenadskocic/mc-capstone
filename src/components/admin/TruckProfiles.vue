<template>
  <div id="truckProfPage">
    <div id="top">
      <h1>Truck Profiles</h1>
      <div id="innerTop">
        <b-form>
          <b-row>
            <b-col sm="2">
              <label>Truck Number:</label>
            </b-col>
            <b-col sm="2">
              <b-input
                type="number"
                class="form-control form-control-md"
                v-model="searchTruck"
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
                <option value="Active">Active</option>
                <option value="Flatbed">Inactive</option>
              </b-select>
            </b-col>
            <b-col sm="4">
              <b-button class="btn btn-dark btn-lg btn-block" id="createBtn" @click="showModal"
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
              <b-th>{{ header.h6 }}</b-th>
              <b-th>{{ header.h7 }}</b-th>
              <b-th>{{ header.h8 }}</b-th>
              <b-th>Edit</b-th>
              <b-th>Delete</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(truck, index) in filteredTruck"
              v-bind:key="index.page"
              :class="{ editing: truck == editedTruck }" v-cloak> 
              <b-td>{{ truck.truck_id }}</b-td>
              <b-td>
                <div class="view">
                  {{ truck.truck_no }}
                </div>
                <div class="edit">
                    <input type="number" v-model="truck.truck_no" disabled />
                    <div>
                      <p id="editErr">{{ e_t_no_err }}</p>
                    </div>
                </div>  
              </b-td>
              <b-td>
                <div class="view">
                  {{ truck.truck_make }}
                </div>
                <div class="edit">
                    <input type="text" v-model="truck.truck_make" />
                    <div>
                      <p id="editErr">{{e_t_make_err }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ truck.truck_model }}
                </div>
                <div class="edit">
                    <input type="text" v-model="truck.truck_model" />
                    <div>
                      <p id="editErr">{{ e_t_model_err }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ truck.truck_year }}
                </div>
                <div class="edit">
                    <input type="text" v-model="truck.truck_year" />
                    <div>
                      <p id="editErr">{{ e_t_year_err }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ truck.truck_plate_no }}
                </div>
                <div class="edit">
                    <input type="text" v-model="truck.truck_plate_no" disabled />
                    <div>
                      <p id="editErr">{{ e_t_plate_no_err }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ truck.truck_type }}
                </div>
                <div class="edit">
                    <b-select
                      type="text"
                      class="form-control form-control-md"
                      v-model="truck.truck_type"
                    >
                        <option value="Box">Box</option>
                        <option value="Flatbed">Flatbed</option>
                        <option value="Semi-trailer">Semi-trailer</option>
                    </b-select>
                </div>
                
              </b-td>
               <b-td>
                <div class="view">
                  {{ truck.truck_status }}
                </div>
                <div class="edit">
                    <b-select
                      type="text"
                      class="form-control form-control-md"
                      v-model="truck.truck_status"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </b-select>
                </div>
              </b-td>
              <b-td class="view">
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="editBtn"
                  @click="editTruck(truck)"
                  >Edit</b-button
                >
              </b-td>
            <b-td class="edit">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="saveEditedTruckBtn"
                    @click="saveEditedTruck(editedTruck)"
                    >Save</b-button
                  >
                </b-td>
              <b-td>
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="deleteBtn"
                  @click="delTruck(truck)"
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
            <h4>Add Truck</h4>
        </b-row>
        <b-form v-model="truckValid" @submit.prevent>
            <b-row>
                <b-col sm="3">
                    <label>Truck No:</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="truck_no"
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Make:</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="truck_make"
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Model:</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="truck_model"            
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Year:</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="truck_year"             
                    />
                </b-col>
            </b-row>
                        <b-row>
                <b-col sm="3">
                    <label>Plate No:</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="text"
                    class="form-control form-control-md"
                    v-model="truck_plate_no"            
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Type:</label>
                </b-col>
                <b-col sm="7">
                    <b-select
                        type="text"
                        class="form-control form-control-md"
                        v-model="truck_type"
                    >
                        <option value="Box">Box</option>
                        <option value="Semi-trailer">Semi-trailer</option>
                    </b-select>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Status:</label>
                </b-col>
                <b-col sm="7">
                    <b-select
                        type="text"
                        class="form-control form-control-md"
                        v-model="truck_status"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </b-select>
                </b-col>
            </b-row>
            <div class="btn-toolbar">
                <b-button
                    id="submitBtn"
                    class="btn btn-dark btn-lg btn-block"
                    @click="addTruck"
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
            <p v-if="modalErrors.length" id="modalError">
            <ul>
                <li v-for="errors in modalErrors" v-bind:key="errors.page">
                {{ errors }}
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
          h1: "Truck ID",
          h2: "Truck No.",
          h3: "Make",
          h4: "Model",
          h5: "Year",
          h6: "Plate No.",
          h7: "Truck Type",
          h8: "Truck Status",
        },
      ],
      modalVis: false,
      searchTruck: "",
      selectStatus: "",
      editedTruck: "",
      e_t_no_err: "",
      e_t_make_err: "",
      e_t_model_err: "",
      e_t_year_err: "",
      e_t_plate_no_err: "",
      truckValid: "",
      modalErrors: [],
      truck_no: "",
      truck_make: "",
      truck_model: "",
      truck_year: "",
      truck_plate_no: "",
      truck_type: "",
      truck_status: "",
    };
  },
  computed: {
    ...mapState(["trucks"]),
    ...mapGetters(["allTrucks"]),

    filteredTruck: function () {
      return this.allTrucks
        .filter(this.searchByTruck)
        .filter(this.selectByStatus);
    },
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["fetchTrucks", "updateTruck", "deleteTruck"]),

    searchByTruck(truck) {
      if (this.searchTruck.length === 0) {
        return true;
      }
      return (
        truck.truck_no.toString().indexOf(this.searchTruck.toString()) > -1
      );
    },
    selectByStatus(truck) {
      if (this.selectStatus.length === 0) {
        return true;
      }
      return truck.truck_status.indexOf(this.selectStatus) > -1;
    },
    delTruck(truck) {
      this.deleteTruck(truck);
    },
    editTruck(truck) {
      this.editedTruck = truck;
    },
    async saveEditedTruck(editedTruck) {
      if (!this.editedTruck.truck_no) {
        this.e_t_no_err = "Blank!";
      }
      if (!this.editedTruck.truck_make) {
        this.e_t_make_err = "Blank!";
      }
      if (!this.editedTruck.truck_model) {
        this.e_t_model_err = "Blank!";
      }
      if (!this.editedTruck.truck_year) {
        this.e_t_year_err = "Blank!";
      }
      if (!this.editedTruck.truck_plate_no) {
        this.e_t_plate_no_err = "Blank!";
      }
      if (
        this.editedTruck.truck_no &&
        this.editedTruck.truck_make &&
        this.editedTruck.truck_model &&
        this.editedTruck.truck_year &&
        this.editedTruck.truck_plate_no
      ) {
        await axios
          .put(
            `http://localhost:3000/truck/${editedTruck.truck_id}`,
            editedTruck
          )
          .then((res) => {
            if (res.status === 200) {
              window.location = "/admin/profiles/truck";
            }
          });
      }
    },
    showModal() {
      this.modalVis = true;
    },
    async addTruck() {
      try {
        this.modalErrors = [];

        if (!this.truck_no) {
          this.modalErrors.push("Truck number required!");
        }
        if (!this.truck_make) {
          this.modalErrors.push("Make required!");
        }
        if (!this.truck_model) {
          this.modalErrors.push("Model required!");
        }
        if (!this.truck_year) {
          this.modalErrors.push("Year required!");
        }
        if (!this.truck_plate_no) {
          this.modalErrors.push("Plate number required!");
        }
        if (!this.truck_status) {
          this.modalErrors.push("Status required!");
        }
        if (!this.modalErrors.length) {
          let truck = {
            truck_no: this.truck_no,
            truck_make: this.truck_make,
            truck_model: this.truck_model,
            truck_year: this.truck_year,
            truck_plate_no: this.truck_plate_no,
            truck_type: this.truck_type,
            truck_status: this.truck_status,
          };
          await axios.post("http://localhost:3000/truck", truck).then((res) => {
            if (res.data === "Duplicate") {
              this.modalErrors.push("Truck no. or plate no. duplicate!");
            } else {
              this.truckValid = true;
              this.modalVis = false;
              window.location = "/admin/profiles/truck";
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      this.modalVis = false;
    },
  },
  created() {
    this.fetchTrucks();
  },
};
</script>

<style scoped>
/** ---------- PAGE ---------------- */
#truckProfPage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px + 25px));
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
  text-align: center;
}
#innerTop option {
  text-align: center;
}
.col-sm-2 label {
  padding-top: 10px;
  vertical-align: -webkit-baseline-middle;
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
.profilesTable input {
  width: 70px;
}
table thead,
th,
tr,
td {
  padding: 24px;
}
table thead {
  font-size: 18px;
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
  margin-right: 15px;
}
#editBtn {
  background-color: lightyellow;
}
#cancelBtn,
#deleteBtn {
  background-color: lightcoral;
}
#cancelBtn {
  margin-left: 150px !important;
}

/** -------------- EDIT ---------- */
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
#saveEditedTruckBtn {
  background-color: lightgreen;
}
#editErr {
  color: red;
  margin-bottom: 0;
}

/** -------------- MODAL ---------- */
#modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 725px;
  border-style: solid;
  border-color: black;
  background-color: lightgray;
}
h4 {
  text-align: middle;
  font-size: 26px;
  margin: 40px 0 20px 0;
  color: black;
}
#modal input,
#modal select {
  margin: 5px;
  text-align: center;
  font-size: 20px;
}
#modal label {
  float: right;
  margin-top: 12px;
}
#submitBtn {
  margin: 20px 0 0 160px;
  background-color: lightgreen;
}
#cancelBtn {
  margin: 20px 0 0 145px !important;
  background-color: lightcoral;
}
#modalError {
  color: red;
  float: right;
  margin: 30px 100px 0 0;
  text-align: right;
}
#modalError li {
  list-style-type: none;
}
</style>