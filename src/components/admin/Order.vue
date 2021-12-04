/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div id="orderPage">
    <h1>Order Page</h1>
    <div>
      <div class="jumbotron text-center">
        <div id="left">
          <b-form-fieldset>
            <table>
              <b-row>
                <b-col sm="4">
                  <label>Order Weight (Kg):</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="weight"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Skids:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="skids"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Cost ($):</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="number"
                    class="form-control form-control-md"
                    v-model="cost"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Pickup Date:</label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="date"
                    class="form-control form-control-md"
                    v-model="pickup_date"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <label>Delivery Date: </label>
                </b-col>
                <b-col sm="7">
                  <b-input
                    type="date"
                    class="form-control form-control-md"
                    v-model="delivery_date"
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
                  <label>Client (Importer) ID:</label>
                </b-col>
                <b-col sm="7">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="client_id"
                  >
                    <option
                      v-for="iClient in importerClient"
                      v-bind:key="iClient.id"
                    >
                      {{ iClient.client_id }}
                    </option>
                  </b-select>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>Truck ID:</label>
                </b-col>
                <b-col sm="7">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="truck_id"
                  >
                    <option v-for="truck in trucks" v-bind:key="truck.id">
                      {{ truck.truck_id }}
                    </option>
                  </b-select>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>Trailer ID:</label>
                </b-col>
                <b-col sm="7">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="trailer_id"
                  >
                    <option v-for="trailer in trailers" v-bind:key="trailer.id">
                      {{ trailer.trailer_id }}
                    </option>
                  </b-select>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="3">
                  <label>Status:</label>
                </b-col>
                <b-col sm="7" id="type">
                  <b-select
                    type="text"
                    class="form-control form-control-md"
                    v-model="order_status"
                  >
                    <option value="Out">Out</option>
                    <option value="Awaiting Pickup">Awaiting Pickup</option>
                    <option value="Delivered">Delivered</option>
                  </b-select>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="5">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="createBtn"
                    @click="create"
                    >Create</b-button
                  >
                </b-col>
                <b-col sm="4">
                  <b-button
                    class="btn btn-dark btn-lg btn-block"
                    id="clearBtn"
                    @click="clear"
                    >Clear</b-button
                  >
                </b-col>
              </b-row>
            </table>
            <p v-if="formErrors.length" id="error">
            <ul>
                <li v-for="errors in formErrors" v-bind:key="errors.page">
                {{ errors }}
                </li>
            </ul>
            </p>
          </b-form-fieldset>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
</script>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
const axios = require("axios");

export default {
  data() {
    return {
      weight: "",
      skids: "",
      cost: "",
      pickup_date: "",
      delivery_date: "",
      order_status: "",
      importerClient: [],
      exporterClient: [],
      trucks: [],
      trailers: [],
      client_id: "",
      truck_id: "",
      trailer_id: "",
      formErrors: [],
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),

    async create() {
      this.formErrors = [];

      if (!this.weight) {
        this.formErrors.push("Weight required!");
      }
      if (!this.skids) {
        this.formErrors.push("Number of skids required!");
      }
      if (!this.cost) {
        this.formErrors.push("Cost required!");
      }
      if (!this.pickup_date) {
        this.formErrors.push("Pickup date required!");
      }
      if (!this.delivery_date) {
        this.formErrors.push("Delivery date required!");
      }
      if (!this.client_id) {
        this.formErrors.push("Client ID required!");
      }
      if (!this.truck_id) {
        this.formErrors.push("Truck ID required!");
      }
      if (!this.trailer_id) {
        this.formErrors.push("Trailer ID required!");
      }
      if (!this.order_status) {
        this.formErrors.push("Order status required!");
      }
      if (!this.formErrors.length) {
        let order = {
          weight: this.weight,
          skids: this.skids,
          cost: this.cost,
          pickup_date: this.pickup_date,
          delivery_date: this.delivery_date,
          client_id: this.client_id,
          truck_id: this.truck_id,
          trailer_id: this.trailer_id,
          order_status: this.order_status,
        };
        await axios.post("http://localhost:3000/orders", order);
        window.location = "/admin/order";
      }
    },
    clear() {
      (this.weight = ""),
        (this.skids = ""),
        (this.cost = ""),
        (this.pickup_date = ""),
        (this.delivery_date = ""),
        (this.client_id = ""),
        (this.truck_id = ""),
        (this.trailer_id = ""),
        (this.order_status = ""),
        (this.formErrors = []);
    },
  },
  created() {
    axios.get("http://localhost:3000/client").then((res) => {
      if (res.status === 200) {
        let data = res.data;
        for (var i in data) {
          if (data[i].client_type == "Exporter") {
            this.exporterClient.push(data[i]);
          }
          if (data[i].client_type == "Importer") {
            this.importerClient.push(data[i]);
          }
        }
      }
    });
    axios.get("http://localhost:3000/truck").then((res) => {
      if (res.status === 200) {
        let data = res.data;
        for (var i in data) {
          this.trucks.push(data[i]);
        }
      }
    });
    axios.get("http://localhost:3000/trailer").then((res) => {
      if (res.status === 200) {
        let data = res.data;
        for (var i in data) {
          this.trailers.push(data[i]);
        }
      }
    });
  },
};
</script>

<style scoped>
/** ---------- PAGE ---------------- */
#orderPage {
  background-color: lightgray;
  height: calc(100vh - (74px + 102.67px + 20px));
  margin-top: 20px;
}
.btn {
  color: black;
}
.jumbotron {
  margin-top: 40px;
  background-color: darkgray;
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
  margin: 20px 0 0 205px !important;
}
#clearBtn {
  background-color: lightcoral;
  margin: 20px 0 0 285px !important;
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
  height: 600px;
  margin-top: 50px;
  width: 50%;
  color: black;
}
#left label,
#right label {
  float: right;
  margin: 15px;
}
#left input,
#right input {
  margin: 5px;
}
#left select,
#right select {
  margin-left: 5px;
}
#error {
  color: red;
  float: right;
  margin: 20px 150px 0 0;
  text-align: right;
}
#error li {
  list-style-type: none;
}
</style>