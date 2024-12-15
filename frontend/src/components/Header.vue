<template>
  <header>
    <nav>
      <router-link to="/" class="nav-link">Main Page</router-link> |
      <router-link to="/signup" class="nav-link">Sign up</router-link> |
      <router-link to="/contactus" class="nav-link">Contacts</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};

</script>

<style scoped></style>
