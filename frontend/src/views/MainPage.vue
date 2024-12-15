<template>
  <div>
    <div class="button-container">
      <button @click="logout" class="button">Logout</button>
    </div>
    <PostsComponent />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import PostsComponent from '../components/Posts.vue';

export default {
  name: 'MainPage',
  components: {
    PostsComponent,
  },
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('token'); 
      router.push('/login');
    };

    return { logout };
  },
};
</script>

<style>

</style>
