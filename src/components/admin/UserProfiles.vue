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
            <b-col sm="1" class="submit">
              <b-button
                type="submit"
                class="btn btn-dark btn-lg btn-block"
                id="modify"
                >Modify</b-button
              >
            </b-col>
            <b-col sm="1" class="submit">
              <b-button
                type="submit"
                class="btn btn-dark btn-lg btn-block"
                id="delete"
                >Delete</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </div>
    </div>
    <div id="bottom">
      <div class="jumbotron text-center">
        <b-table :items="items" class="profiles">
          <thead></thead>
          <tbody></tbody>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { user_ID: 1, first_name: "Test", last_name: "Test" },
        { user_ID: 2, first_name: "Test", last_name: "Test" },
        { user_ID: 3, first_name: "Test", last_name: "Test" },
        { user_ID: 4, first_name: "Test", last_name: "Test" },
      ],
    };
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
.submit button {
  background-color: rgb(254, 155, 59);
  color: black;
}
#bottom {
  height: 85%;
}
.jumbotron {
  margin-top: 2%;
  background-color:darkgray
}
</style>