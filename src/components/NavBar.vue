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
          <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About Us</b-nav-item>
          <b-nav-item :to="{ name: 'services' }">Services</b-nav-item>
          <b-nav-item :to="{ name: 'news' }">News</b-nav-item>
          <b-nav-item :to="{ name: 'team' }">Our Team</b-nav-item>
          <b-nav-item :to="{ name: 'contact' }">Contact Us</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav id="right">
          <b-nav-item :to="{ name: 'login' }" id="login">Login</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
</script>
<style>
.navbar {
  background-color: whitesmoke;
  position: relative;
}
.navbar-nav {
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100px;
}
.navbar-dark .navbar-nav .nav-link {
  color: black !important;
}
.navbar-brand img {
  padding-left: 10px;
  width: 150px;
  height: 100px;
}
.navbar .nav-item {
  font-size: 24px;
  padding: 10px;
}
.navbar-dark .navbar-nav .nav-link .v1 {
  color: gray;
}
#left {
  width: 20%;
}
#middle {
  justify-content: left;
}
#right {
  width: 20%;
  justify-content: right;
  padding-right: 10px;
}
#login {
  background-color: rgb(254, 155, 59);
}

</style>