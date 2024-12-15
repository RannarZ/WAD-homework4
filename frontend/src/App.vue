<template>
  <div id="app">
    <AppHeader :isAuthenticated="isAuthenticated" @logout="logout" />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    isAuthenticated() {
      // Check if token exists in localStorage (or replace with Vuex getter if using Vuex)
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    logout() {
      // Clear token and redirect to login page
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
