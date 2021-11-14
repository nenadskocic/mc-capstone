<template>
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
    <b-row id="copyright">JSD Transportation Inc. - All Rights Reserved</b-row>
  </footer>
</template>

<script></script>
<style scoped>
footer {
  background-color: #242526;
}
footer .row,
#copyright {
  margin: 0;
}
.footer div.row {
  margin: 0;
}
#footerNav {
  padding: 10px 0 0 0;
  justify-content: center;
  position: relative;
}
#footerNav .nav-item p {
  font-size: 18px;
  color: gray;
}
#footerNav .nav-item p:hover {
  color: orange;
}
#copyright {
  color: gray;
  justify-content: center;
  padding-bottom: 10px;
}
</style>