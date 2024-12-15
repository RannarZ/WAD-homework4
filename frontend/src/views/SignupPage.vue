<template>
  <div class="signup-page">
    <h2>Signup</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await axios.post("http://localhost:3000/api/signup", {
          email: this.email,
          password: this.password,
        });
        alert("Signup successful! Token: " + response.data.token);
      } catch (error) {
        console.error("Signup failed:", error.message);
        alert("Signup failed: " + (error.response?.data?.message || error.message));
      }
    },
  },
};

</script>

<style>
.signup-page {
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
