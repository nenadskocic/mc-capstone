/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div id="trailerProfPage">
    <div id="top">
      <h1>Trailer Profiles</h1>
      <div id="innerTop">
        <b-form>
          <b-row>
            <b-col sm="2">
              <label>Trailer Number:</label>
            </b-col>
            <b-col sm="2">
              <b-input
                type="number"
                class="form-control form-control-md"
                v-model="searchTrailer"
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
              <b-th>{{ header.h9 }}</b-th>
              <b-th>{{ header.h10 }}</b-th>
              <b-th>Edit</b-th>
              <b-th>Delete</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(trailer, index) in filteredTrailer"
              v-bind:key="index.page"
              :class="{ editing: trailer == editedTrailer }" v-cloak> 
              <b-td>{{ trailer.trailer_id }}</b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_no }}
                </div>
                <div class="edit">
                    <input type="number" v-model="trailer.trailer_no" disabled />
                    <div>
                      <p id="editErr">{{ e_tr_no_err }}</p>
                    </div>
                </div>  
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_make }}
                </div>
                <div class="edit">
                    <input type="text" v-model="trailer.trailer_make" />
                    <div>
                      <p id="editErr">{{ e_tr_make_err }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_year }}
                </div>
                <div class="edit">
                    <input type="number" v-model="trailer.trailer_year" />
                    <div>
                      <p id="editErr">{{ e_tr_year_err }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_type }}
                </div>
                <div class="edit">
                    <b-select
                      type="text"
                      class="form-control form-control-md"
                      v-model="trailer.trailer_type"
                    >
                        <option value="Dry Van">Dry Van</option>
                        <option value="Flatbed">Flatbed</option>
                        <option value="Reefer">Reefer</option>
                    </b-select>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_plate_no }}
                </div>
                <div class="edit">
                    <input type="text" v-model="trailer.trailer_plate_no" disabled />
                    <div>
                      <p id="editErr">{{ e_tr_plate_no_err }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_length }}
                </div>
                <div class="edit">
                    <input type="text" v-model="trailer.trailer_length" />
                    <div>
                      <p id="editErr">{{ e_tr_length }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_volume }}
                </div>
                <div class="edit">
                    <input type="text" v-model="trailer.trailer_volume" />
                    <div>
                      <p id="editErr">{{ e_tr_volume }}</p>
                    </div>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.ride_type }}
                </div>
                <div class="edit">
                    <b-select
                      type="text"
                      class="form-control form-control-md"
                      v-model="trailer.ride_type"
                    >
                        <option value="Air">Air</option>
                        <option value="Spring">Spring</option>
                    </b-select>
                </div>
              </b-td>
              <b-td>
                <div class="view">
                  {{ trailer.trailer_status }}
                </div>
                <div class="edit">
                    <b-select
                      type="text"
                      class="form-control form-control-md"
                      v-model="trailer.trailer_status"
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
                  @click="editTrailer(trailer)"
                  >Edit</b-button
                >
              </b-td>
              <b-td class="edit">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="saveEditedBtn"
                    @click="saveEditedTrailer(editedTrailer)"
                    >Save</b-button
                  >
                </b-td>
              <b-td>
                <b-button
                  class="btn btn-dark btn-lg btn-block"
                  id="deleteBtn"
                  @click="delTrailer(trailer)"
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
            <h4>Add Trailer</h4>
        </b-row>
        <b-form v-model="trailerValid" @submit.prevent>
            <b-row>
                <b-col sm="3">
                    <label>Truck No:</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="trailer_no"
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
                    v-model="trailer_make"
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
                    v-model="trailer_year"
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Trailer Type:</label>
                </b-col>
                <b-col sm="7">
                    <b-select
                      type="text"
                      class="form-control form-control-md"
                      v-model="trailer_type"
                    >
                        <option value="Dry Van">Dry Van</option>
                        <option value="Flatbed">Flatbed</option>
                        <option value="Reefer">Reefer</option>
                    </b-select>
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
                    v-model="trailer_plate_no"
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Length (ft):</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="trailer_length"
                    />
                </b-col>
            </b-row>
             <b-row>
                <b-col sm="3">
                    <label>Volume (cu ft):</label>
                </b-col>
                <b-col sm="7">
                    <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="trailer_volume"
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <label>Ride Type:</label>
                </b-col>
                <b-col sm="7">
                    <b-select
                      type="text"
                      class="form-control form-control-md"
                      v-model="ride_type"
                    >
                        <option value="Air">Air</option>
                        <option value="Spring">Spring</option>
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
                      v-model="trailer_status"
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
                    @click="addTrailer"
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
            <ul id="errorList">
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
          h1: "Trailer ID",
          h2: "Trailer No.",
          h3: "Make",
          h4: "Year",
          h5: "Trailer Type",
          h6: "Plate No.",
          h7: "Trailer Length",
          h8: "Trailer Volume",
          h9: "Ride Type",
          h10: "Status",
        },
      ],
      // Filter variables
      searchTrailer: "",
      selectStatus: "",

      // Edit mode variables
      editedTrailer: "",
      e_tr_no_err: "",
      e_tr_make_err: "",
      e_tr_year_err: "",
      e_tr_type_err: "",
      e_tr_plate_no_err: "",
      e_tr_length: "",
      e_tr_volume: "",
      e_tr_ride_type: "",
      e_tr_status: "",

      // Modal
      modalVis: false,
      modalErrors: [],
      trailer_no: "",
      trailer_make: "",
      trailer_year: "",
      trailer_type: "",
      trailer_plate_no: "",
      trailer_length: "",
      trailer_volume: "",
      ride_type: "",
      trailer_status: "",
      trailerValid: "",
    };
  },
  computed: {
    ...mapState(["trailers"]),
    ...mapGetters(["allTrailers"]),

    filteredTrailer: function () {
      return this.allTrailers
        .filter(this.searchByTrailer)
        .filter(this.selectByStatus);
    },
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["fetchTrailers", "updateTrailer", "deleteTrailer"]),

    searchByTrailer(trailer) {
      if (this.searchTrailer.length === 0) {
        return true;
      }
      return (
        trailer.trailer_no.toString().indexOf(this.searchTrailer.toString()) >
        -1
      );
    },
    selectByStatus(trailer) {
      if (this.selectStatus.length === 0) {
        return true;
      }
      return trailer.trailer_status.indexOf(this.selectStatus) > -1;
    },
    delTrailer(trailer) {
      this.deleteTrailer(trailer);
    },
    editTrailer(trailer) {
      this.editedTrailer = trailer;
    },
    async saveEditedTrailer(editedTrailer) {
      if (!this.editedTrailer.trailer_make) {
        this.e_tr_make_err = "Blank!";
      }
      if (!this.editedTrailer.trailer_year) {
        this.e_tr_year_err = "Blank!";
      }
      if (!this.editedTrailer.trailer_type) {
        this.e_tr_type_err = "Blank!";
      }
      if (!this.editedTrailer.trailer_length) {
        this.e_tr_length = "Blank!";
      }
      if (!this.editedTrailer.trailer_volume) {
        this.e_tr_volume = "Blank!";
      }
      if (!this.editedTrailer.ride_type) {
        this.e_tr_ride_type = "Blank!";
      }
      if (!this.editedTrailer.trailer_status) {
        this.e_tr_status = "Blank!";
      }
      if (
        this.editedTrailer.trailer_make &&
        this.editedTrailer.trailer_year &&
        this.editedTrailer.trailer_type &&
        this.editedTrailer.trailer_length &&
        this.editedTrailer.trailer_volume &&
        this.editedTrailer.ride_type &&
        this.editedTrailer.trailer_status
      ) {
        await axios
          .put(
            `http://159.65.218.19:3000/trailer/${editedTrailer.trailer_id}`,
            editedTrailer
          )
          .then((res) => {
            if (res.status === 200) {
              window.location = "/admin/profile/trailer";
            }
          });
      }
    },
    showModal() {
      this.modalVis = true;
    },
    async addTrailer() {
      try {
        this.modalErrors = [];

        if (!this.trailer_no) {
          this.modalErrors.push("Trailer no. req.!");
        }
        if (!this.trailer_make) {
          this.modalErrors.push("Make req.!");
        }
        if (!this.trailer_year) {
          this.modalErrors.push("Year req.!");
        }
        if (!this.trailer_type) {
          this.modalErrors.push("Type req.!");
        }
        if (!this.trailer_plate_no) {
          this.modalErrors.push("Plate no. req.!");
        }
        if (!this.trailer_length) {
          this.modalErrors.push("Length req.!");
        }
        if (!this.trailer_volume) {
          this.modalErrors.push("Volume req.!");
        }
        if (!this.ride_type) {
          this.modalErrors.push("Ride type req.!");
        }
        if (!this.trailer_status) {
          this.modalErrors.push("Status req.!");
        }
        if (!this.modalErrors.length) {
          let trailer = {
            trailer_no: this.trailer_no,
            trailer_make: this.trailer_make,
            trailer_year: this.trailer_year,
            trailer_type: this.trailer_type,
            trailer_plate_no: this.trailer_plate_no,
            trailer_length: this.trailer_length,
            trailer_volume: this.trailer_volume,
            ride_type: this.ride_type,
            trailer_status: this.trailer_status,
          };
          await axios
            .post("http://159.65.218.19:3000/trailer", trailer)
            .then((res) => {
              if (res.data === "Duplicate") {
                this.modalErrors.push("Trailer no. or trailer no. duplicate!");
              } else {
                this.trailerValid = true;
                this.modalVis = false;
                window.location = "/admin/profile/trailer";
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
    this.fetchTrailers();
  },
};
</script>

<style scoped>
/** ---------- PAGE ---------------- */
#trailerProfPage {
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
  font-size: 20px;
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
  width: 100px;
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
#saveEditedBtn {
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
  height: 780px;
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
#errorList {
  display: grid;
  grid-template-rows: repeat(3, min-content);
  grid-auto-flow: column;
}
#modalError li {
  list-style-type: none;
  margin-left: 50px;
  text-align: left;
}
</style>