<template>
  <div id="app">
    <b-navbar toggleable="lg" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto">
          <b-nav-item
            @click="$router.push('login').catch((err) => {})"
            class="btn-outline-success mr-2"
          >
            Login
          </b-nav-item>
          <b-nav-item
            @click="$router.push('users').catch((err) => {})"
            class="btn-outline-success mr-2"
          >
            Users Table
          </b-nav-item>
          <b-nav-item
            @click="$router.push('add-user').catch((err) => {})"
            class="btn-outline-success mr-2"
          >
            Add new user
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
/*
	Initial component, consists of a navbar and general styling.
*/
export default {
  name: "App",
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

body {
  font-family: "Roboto", sans-serif !important;
  background: #76b852;
  background: -webkit-linear-gradient(right, #76b852, #8dc26f);
  background: -moz-linear-gradient(right, #76b852, #8dc26f);
  background: -o-linear-gradient(right, #76b852, #8dc26f);
  background: linear-gradient(to left, #76b852, #8dc26f);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn-outline-success {
  border: 1px solid;
}

.forms {
  background: #f8f9fa;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.forms input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.forms .submit-button {
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 10px;
  color: #ffffff;
  font-size: 14px;
}

.forms .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.forms .message a {
  color: #4caf50 !important;
  cursor: pointer;
}
</style>
