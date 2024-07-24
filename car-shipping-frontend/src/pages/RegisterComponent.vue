<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Register</h1>
      <hr>
      <form @submit.prevent="onRegister">
        <div class="form-group mb-2">
          <label for="name">Name</label>
          <input id="name" type="text" v-model="name" placeholder="Name" class="form-control"/>
          <p class="text-danger mt-1" v-if="errors.name">{{errors.name}}</p>
        </div>
        <div class="form-group mb-2">
          <label for="email">Email</label>
          <input id="email" type="text" v-model="email" placeholder="Email" class="form-control"/>
          <p class="text-danger mt-1" v-if="errors.email">{{errors.email}}</p>
        </div>
        <div class="form-group mb-2">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" placeholder="Password" class="form-control"/>
          <p class="text-danger mt-1" v-if="errors.password">{{errors.password}}</p>
        </div>
        <div class="my-3">
          <button class="btn btn-primary" type="submit">Signup</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ValidationsService from "../services/ValidationsService";
import {mapActions} from "vuex";
import {SIGNUP_ACTION} from "../store/storeconstants";
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    ...mapActions('auth', {
      signup: SIGNUP_ACTION
    }),
    async onRegister() {
      let validations = new ValidationsService(
          this.email,
          this.password,
          this.name
      );

      this.errors = validations.checkSignupValidation();
      if(this.errors.length){
        return false;
      }

      await this.signup({email: this.email, password: this.password, name: this.name}).catch((error) => {
        this.errors = error;
      });
    }
  }
};
</script>