<template>
  <div class="footerContainer">
    <footer>
      <b-row>
        <b-navbar id="footerNav">
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'contact' }"><p>Contact Us</p></b-nav-item>
            <b-nav-item>
              <div><p>|</p></div>
            </b-nav-item>
            <b-nav-item :to="{ name: 'about' }"><p>About Us</p></b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </b-row>
      <b-row id="copyright"
        >JSD Transportation Inc. - All Rights Reserved</b-row
      >
    </footer>
  </div>
</template>

<script></script>
<style>
.footerContainer {
  background-color: #242526;
}
.footerContainer div.row {
  margin: 0;
}
#footerNav {
  border-top-style: solid;
  border-color: black;
  padding: 10px 0 0 0;
  padding: 0;
  margin: 0;
}
#footerNav .nav-item {
  padding: 0;
  justify-content: center;
}
#footerNav .nav-item p {
  font-size: 18px;
  color: gray;
}
.nav-item p:hover {
  color: orange;
}
#copyright {
  padding: 0px 0px 20px 0px;
  color: gray;
  justify-content: center;
}
</style>