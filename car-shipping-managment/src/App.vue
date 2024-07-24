<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#">Car Shipping Management</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/cars" class="nav-link">Cars</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/register" class="nav-link">Signup</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a href="#" class="nav-link" @click.prevent="onLogout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {AUTO_LOGIN_ACTION, IS_AUTHENTICATED_GETTER, LOGOUT_ACTION} from "@/store/storeconstants";

export default {
  computed:{
    ...mapGetters('auth',{
      isAuthenticated: IS_AUTHENTICATED_GETTER
    })
  },
  created(){
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
  },
  methods:{
    ...mapActions('auth',{
      logout: LOGOUT_ACTION
    }),
    onLogout(){
      this.logout();
      this.$router.replace('login')
    }
  }
}
</script>

