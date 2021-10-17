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
          <b-nav-item :to="{ name: 'login' }" id="loginBtn"><h1>Login</h1></b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
</script>
<style>
.navbar {
  position: relative;
}
.navbar-nav {
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100px;
}
.navbar-dark .navbar-nav .nav-link {
  color: gray !important;
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

#left {
  width: 20%;
}
#middle {
  justify-content: left;
  background-color:#242526;
}
#right {
  width: 20%;
  justify-content: right;
  padding-right: 10px;
  background-color: #242526;
}
#loginBtn {
  background-color: rgb(254, 155, 59);
}
h1 {
    font-size: 24px;
    color: black;
}
</style>