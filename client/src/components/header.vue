<template>
  <div>
    <div class="header-wrapper">
      <nav
        class="navbar navbar-expand-lg navbar-fixed-top navbar-light"
        style="padding:0rem !important;"
        @scroll="updateNavigation"
        :class="{navbarB : scrollPosition > 50, navbarA : scrollPosition < 60 }"
      >
        <div class="container">
          <a href="#" class="navbar-brand" style="font-weight:500;">
            <span class="header-style">Send-</span>AM
          </a>
          
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#miniNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="miniNavbar">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <div class="alert alert-success" v-if="$store.state.show">
                  <strong>{{success}}</strong>
                </div>
              </li>
              <router-link tag="li" exact to="/" active-class="active" class="nav-item sign">
                <a class="nav-link">Home</a>
              </router-link>
              <!-- <router-link tag="li" exact to="/viewMenu" class="nav-item">
                <a class="nav-link">View Menu</a>
              </router-link>
              <router-link tag="li" exact to="/" class="nav-item">
                <a class="nav-link">Reservations</a>
              </router-link>
              <router-link tag="li" exact to="/" class="nav-item">
                <a class="nav-link">Contact</a>
              </router-link> -->
           

              <router-link
                tag="li"
                v-show="$store.state.userLoggedIn"
                :to="{path : '/'}"
                class="nav-item sign"
              >
                <span @click.prevent="logout()" class="nav-link">Log out</span>
              </router-link>
              <router-link
                tag="li"
                v-show="!$store.state.userLoggedIn"
                exact
                to="/login"
                class="nav-item sign"
              >
                <a class="nav-link">Login</a>
              </router-link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      scrollPosition: null
    };
  },
  computed: {
    ...mapState(["success"])
  },
  methods: {
    logout: function() {
      this.$store.commit("logout");
    },
    updateNavigation() {
      this.scrollPosition = window.scrollY;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.updateNavigation);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateNavigation);
  }
};
</script>

<style>
.header-wrapper {
  width: 100%;
  background: #4fc7b3;
  position: relative;
  padding: 0;
  z-index: 999px;
}
.header-style {
  color: #fff;
  background-repeat: no-repeat;
  background-size: 100%;
  /* background-color: rgba(45, 185, 155, 0.329); */
}
.navbarA {
  background-color: #4fc7b3;
  padding: 0rem !important;
  box-shadow: 0 0.2rem 1.6rem rgba(0, 0, 0, 0.5);
  width: 100% !important;
  position: absolute !important;
  z-index: 9999;
  transition: all 0.5s;
  backface-visibility: none;
}
.navbarB {
  background-color: #fff;
  padding: 0rem !important;
  box-shadow: 0 0.2rem 1.6rem rgba(0, 0, 0, 0.5);
  width: 100% !important;
  position: fixed !important;
  z-index: 99999;
  transition: all 0.5s;
  overflow: hidden;
  backface-visibility: none;
}
.nav-link {
  font-weight: 600;
  font-size: 0.9rem;
  display: block;
  text-align: center;
}
.nav-link:hover {
  color: #4fc7b3 !important;
  transition: all 0.2s;
}
.sign {
  display: inline;
  text-align: center;
  border: 1px solid #ffffff;
  margin-left: 0.4rem;
  padding: 0 5px 0 5px;
  border-radius: 20px;
  color: red !important;
}
.sign:hover {
  color: #fff !important;
  background-color:  grey !important;
  border: 1px solid #fff !important;
  transition: all 0.2s;
}
.sign .nav-link:hover {
  color: #fff !important;
  transition: all 0.2s;
}
</style>
