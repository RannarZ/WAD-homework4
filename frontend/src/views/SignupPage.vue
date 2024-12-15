<template>
  <div class="signup-page">
    <h2>Signup</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button class="button">Signup</button>
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
      validationErrors: [],
    };
  },
  methods: {

    validatePassword(password) {
          const errors = [];
          const lengthValid = password.length >= 8 && password.length < 15;
          const startsWithUppercase = /^[A-Z]/.test(password);
          const hasUppercase = /[A-Z]/.test(password);
          const hasTwoLowercase = (password.match(/[a-z]/g) || []).length >= 2;
          const hasNumber = /\d/.test(password);
          const includesUnderscore = /_/.test(password);

          if (!lengthValid) errors.push("Password must be between 8 and 14 characters.");
          if (!startsWithUppercase) errors.push("Password must start with an uppercase letter.");
          if (!hasUppercase) errors.push("Password must include at least one uppercase letter.");
          if (!hasTwoLowercase) errors.push("Password must include at least two lowercase letters.");
          if (!hasNumber) errors.push("Password must include at least one numeric value.");
          if (!includesUnderscore) errors.push('Password must include the character "_".');

          return errors;
      },

   async handleSignup() {

    this.validationErrors = this.validatePassword(this.password);

    if (this.validationErrors.length > 0) {
        alert("Password validation failed:\n" + this.validationErrors.join("\n"));
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/api/signup", {
          email: this.email,
          password: this.password,
        });
        console.log("User Signed Up",  response.data);
        alert("Signup successful! Token: " + response.data.token);
        this.$router.push("/login");
        
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
