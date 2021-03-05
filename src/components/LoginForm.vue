<template>
  <b-container>
    <b-row class="mt-5">
      <b-col md="6" offset-md="3">
        <b-form class="forms p-3" @submit="onSubmit">
          <b-form-input
            type="email"
            placeholder="email"
            v-model="form.email"
            required
          />
          <b-form-input
            type="password"
            placeholder="password"
            v-model="form.pwd"
            required
          />
          <button class="submit-button">login</button>
          <p class="message">
            Not registered?
            <a @click="$router.push('add-user')">Create an account</a>
          </p>
          <p class="message mt-0">
            (Hint: credentials can be found in the console)
          </p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/*
	Login component with a simple check if any of the know users is trying to 
	log in with its email and password. Console logging (r56) all of the users for 
	testing purposes, also - on a faulty login attempt - a toast message is popping
	up.
*/
import Axios from "axios";
const usersURL = "http://localhost:3500/users";

export default {
  name: "login-form-component",
  data() {
    return {
      usersList: [],
      userSingle: {},
      form: {
        email: "",
        pwd: "",
      },
      displayToast: true,
    };
  },
  created() {
    Axios.get(usersURL).then((response) => {
      this.usersList = response.data;
      console.log(response.data);
    });
  },
  methods: {
    loginCheck(event) {
      for (let index = 0; index < this.usersList.length; index++) {
        if (
          this.usersList[index].email === this.form.email &&
          this.usersList[index].password === this.form.pwd
        ) {
          this.displayToast = false;
          this.$router.push("users");
          break;
        }
      }

      if (this.displayToast) {
        event.preventDefault();
        this.makeToast();
      }
    },
    makeToast(append = false) {
      this.$bvToast.toast(`Maybe check the console?`, {
        title: "Invalid username and/or password",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
    onSubmit(event) {
      this.loginCheck(event);
    },
  },
};
</script>

<style>
</style>