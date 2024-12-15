<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/signup">Signup here</router-link></p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post("http://localhost:3000/api/login", {
                email: this.email,
                password: this.password,
                });

                if (response && response.data) {
                const token = response.data.token;

                // Store token in localStorage for future authenticated requests
                localStorage.setItem("token", token);

                alert("Login successful! Token saved.");
                console.log("Received Token:", token);

                // Redirect to a protected page or homepage
                this.$router.push("/");
                } else {
                throw new Error("Unexpected response format");
                }
            } catch (error) {
                console.error("Login failed:", error.response ? error.response.data : error.message);
                alert("Login failed: " + (error.response?.data?.message || error.message));
            }
            },
    },
  };
  </script>
  
  <style>
  .login-page {
    text-align: center;
    margin-top: 50px;
  }
  input {
    display: block;
    margin: 10px auto;
    padding: 10px;
    width: 200px;
  }
  button {
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  