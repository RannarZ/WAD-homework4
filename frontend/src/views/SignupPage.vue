<template>
  <div id="main-container-signup">
    <form id="signup-form" @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email" placeholder="Enter your email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password" placeholder="Enter your password"
          required />
      </div>
      <div v-if="validationErrors.length" class="error-messages">
        <p v-for="(error, index) in validationErrors" :key="index" class="error-text">
          {{ error }}
        </p>
      </div>
      <button type="submit" class="submit-button">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
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
    handleSignup() {
      this.validationErrors = this.validatePassword(this.password);
      if (this.validationErrors.length === 0) {
        console.log("User Signed Up", {
          //TODO: Vaja andmebaasist kinnitus saada.
          email: this.email,
          password: this.password,
        });
        alert(`Sign-up successful for ${this.email}`);
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
.error-messages {
  color: red;
  margin-top: 10px;
}

.error-text {
  font-size: 0.9em;
}
</style>
