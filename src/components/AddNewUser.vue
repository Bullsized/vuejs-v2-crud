<template>
  <b-container>
    <b-row class="mt-5">
      <b-col md="6" offset-md="3">
        <b-form class="forms p-3" @submit="onSubmit">
          <b-form-input
            type="text"
            placeholder="First name"
            v-model="user.first_name"
            required
          />
          <b-form-input
            type="text"
            placeholder="Last name"
            v-model="user.last_name"
            required
          />
          <b-form-input
            type="email"
            placeholder="Email"
            v-model="user.email"
            required
          />
          <b-form-input
            type="password"
            placeholder="Password"
            v-model="user.password"
            required
          />
          <b-form-input
            type="tel"
            placeholder="Phone"
            v-model="user.phone"
            required
          />
          <b-form-input
            type="text"
            placeholder="Address"
            v-model="user.street_address"
            required
          />
          <b-form-input
            type="text"
            placeholder="City"
            v-model="user.city"
            required
          />
          <b-form-input
            type="text"
            placeholder="Country"
            v-model="user.country"
            required
          />
          <b-form-input
            type="text"
            placeholder="Postal code"
            v-model="user.postal_code"
          />
          <b-form-datepicker
            id="example-datepicker"
            placeholder="Choose birthday"
            class="mb-3"
            menu-class="w-100"
            calendar-width="100%"
            :date-format-options="{
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
            }"
            v-model="user.date_of_birth"
          >
          </b-form-datepicker>
          <b-form-file
            :state="Boolean(user.avatar)"
            placeholder="Upload an avatar"
            drop-placeholder="Drop file here..."
            v-model="user.avatar"
          >
          </b-form-file>
          <button class="submit-button">add a new user</button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/*
  Add a new user component, consists of the necessary inputs bind by Vue and shaped
  as a user object, which is then inserted as through Axios. Various functions for 
  formatting dates used.
*/
import Axios from "axios";
const usersURL = "http://localhost:3500/users";

export default {
  name: "add-new-user-component",
  data() {
    return {
      usersList: [],
      userIdAndStatus: Number,
      user: {
        id: this.userIdAndStatus,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        active: true,
        status: this.userIdAndStatus,
        phone: "",
        date_of_birth: "",
        country: "",
        city: "",
        postal_code: null,
        street_address: "",
        avatar: null,
        created_at: this.getTodaysDate(),
        updated_at: this.getTodaysDate(),
      },
    };
  },
  created() {
    Axios.get(usersURL).then((response) => {
      this.usersList = response.data;
      this.userIdAndStatus = this.usersList.length + 1;
    });
  },
  methods: {
    getTodaysDate() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    },
    formatDoB(date) {
      const dateObj = new Date(date + "T00:00:00");
      return new Intl.DateTimeFormat("en-US").format(dateObj);
    },
    onSubmit() {
      this.user.date_of_birth = this.formatDoB(this.user.date_of_birth);
      Axios.post(usersURL, this.user);
      Axios.get(usersURL).then((response) => {
        this.usersList = response.data;
      });
      this.$router.push("users");
    },
  },
};
</script>

<style>
.b-form-datepicker {
  background-color: #f2f2f2 !important;
  border: none !important;
}

.text-muted {
  text-align: left;
  font-size: 14px !important;
}

.b-form-file {
  margin-bottom: 15px !important;
}

.custom-file-label {
  border: none !important;
  background-color: #f2f2f2 !important;
  text-align: left;
  font-size: 14px !important;
}
</style>