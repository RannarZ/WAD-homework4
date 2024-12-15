<template>
  <div>
    <div class="button-container"> <button @click="logout" class="button">Logout</button>
    </div>
   
    
    <PostsComponent />
  </div>
</template>

<script>
import PostsComponent from '../components/Posts.vue';

export default {
  name: 'MainPage',
  components: {
    PostsComponent,
  },
};
</script>


<style></style>
