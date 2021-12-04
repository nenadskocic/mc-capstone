/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div id="driverDispatchPage">
    <div id="top">
      <h1>Driver Dispatch Page</h1>
      <div id="innerTop">
        <b-form>
          <b-row>
            <b-col sm="1">
              <label>Order ID:</label>
            </b-col>
            <b-col sm="2">
              <b-input
                type="number"
                class="form-control form-control-md"
                v-model="searchOrderID"
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
                <option value="Out">Out</option>
                <option value="Awaiting Pickup">Awaiting Pickup</option>
                <option value="Delivered">Delivered</option>
              </b-select>
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
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(order, index) in filteredOrders"
              v-bind:key="index.page"
            >
              <b-td>{{ order.order_id }}</b-td>
              <b-td>
                <div>
                  {{ order.client_id }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.truck_id }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.trailer_id }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.weight }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.skids }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.cost }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.pickup_date }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.delivery_date }}
                </div>
              </b-td>
              <b-td>
                <div>
                  {{ order.status }}
                </div>
              </b-td>
            </b-tr>
          </b-tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      headers: [
        {
          h1: "Order ID",
          h2: "Client ID",
          h3: "Truck ID",
          h4: "Trailer ID",
          h5: "Weight",
          h6: "Skids",
          h7: "Cost ($)",
          h8: "Pickup Date",
          h9: "Delivery Date",
          h10: "Status",
        },
      ],
      searchOrderID: "",
      selectStatus: "",
    };
  },
  computed: {
    ...mapState(["orders"]),
    ...mapGetters(["allOrders"]),

    filteredOrders: function () {
      return this.allOrders
        .filter(this.searchByOrderID)
        .filter(this.selectByStatus);
    },
  },
  methods: {
    ...mapActions(["fetchOrders"]),

    searchByOrderID(order) {
      if (this.searchOrderID.length === 0) {
        return true;
      }
      return (
        order.order_id.toString().indexOf(this.searchOrderID.toString()) > -1
      );
    },
    selectByStatus(order) {
      if (this.selectStatus.length === 0) {
        return true;
      }
      return order.status.indexOf(this.selectStatus) > -1;
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
#driverDispatchPage {
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
</style>