/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <div>
    <b-navbar type="dark" toggleable="lg">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav>
        <b-navbar-nav class="mx-auto" id="left">
          <b-navbar-brand href="#">
            <img src="@/assets/images/logos/JSD_android-chrome-192x192.png" />
          </b-navbar-brand>
        </b-navbar-nav>
        <b-navbar-nav class="mx-auto" id="middle">
          <!-- <b-nav-item :to="{ name: 'login' }"><p>Home</p></b-nav-item>
          <b-nav-item :to="{ name: 'about' }"><p>About Us</p></b-nav-item>
          <b-nav-item :to="{ name: 'services' }"><p>Services</p></b-nav-item>
          <b-nav-item :to="{ name: 'news' }"><p>News</p></b-nav-item>
          <b-nav-item :to="{ name: 'team' }"><p>Our Team</p></b-nav-item>
          <b-nav-item :to="{ name: 'contact' }"><p>Contact Us</p></b-nav-item> -->
          <b-nav-item-dropdown text="Profiles" right>
            <b-dropdown-item :to="{ name: 'userProfiles' }"
              >User</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'driverProfiles' }"
              >Driver</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'truckProfiles' }"
              >Truck</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'trailerProfiles' }"
              >Trailer</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'clientProfiles' }"
              >Client</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav id="right">
          <b-nav-item>
            <b-button @click="loggedState" id="loginBtn">
              {{ isLogged !== null ? "Logout" : "Login" }}
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
 /* eslint-disable */
<script>
export default {
  data: () => ({
    get isLogged() {
      return localStorage.getItem("authUser");
    },
    set isLogged(x) {
      localStorage.setItem("authUser", x);
    },
  }),
  methods: {
    loggedState() {
      if (localStorage.getItem("authUser") !== null) {
        this.authUser = null;
        localStorage.clear();
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  position: relative;
}
.navbar-nav {
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 74px;
}
.navbar-dark .navbar-nav .nav-link {
  color: gray !important;
}
.navbar-expand-lg {
  padding: 0;
}
.navbar-brand img {
  padding-left: 10px;
  width: 150px;
  height: 74px;
}
.navbar .nav-item {
  font-size: 24px;
  padding: 10px;
}
.nav-item p {
  padding: 0;
  margin: 0;
}
.nav-item p:hover,
.nav-item span:hover,
.nav-link dropdown:hover {
  color: orange !important;
}
#left {
  width: 20%;
}
#middle {
  justify-content: left;
  background-color: #242526;
}
#right {
  width: 20%;
  justify-content: right;
  background-color: #242526;
}
#loginBtn {
  background-color: rgb(254, 155, 59);
  height: 50px;
  color: black;
  font-weight: 550;
}
</style>