<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Login</h1>
      <hr>
      <form @submit.prevent="onLogin">
        <p class="text-danger my-2" v-if="errors.message">{{errors.message}}</p>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="text" v-model.trim="email" placeholder="Email" class="form-control"/>
          <p class="text-danger mt-1" v-if="errors.email">{{ errors.email }}</p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model.trim="password" placeholder="Password" class="form-control"/>
          <span class="text-danger mt-1" v-if="errors.password">{{ errors.password }}</span>
        </div>
        <div class="my-3">
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ValidationsService from "../services/ValidationsService";
import {mapActions} from "vuex";
import {LOGIN_ACTION} from "../store/storeconstants";

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    ...mapActions('auth', {
      login: LOGIN_ACTION
    }),
    async onLogin() {
      let validations = new ValidationsService(
          this.email,
          this.password
      );

      this.errors = validations.checkLoginValidation();
      if (this.errors.length) {
        return false;
      }

      //login action
      await this.login({email: this.email, password: this.password}).catch((error) => {
        this.errors = error;
      });
      this.$router.push('/cars')
    }
  }
};
</script>