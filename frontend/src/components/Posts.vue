<template>
    <div>
      <div class="posts-container">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-header">
          <img src="../images/logo.jpg" alt="User Profile" class="profile-image" />
          <span class="post-author">{{ post.author }}</span>
          <span class="post-date">{{ formatDate(post.createTime) }}</span>
        </div>
        <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
        <p class="post-text">{{ post.content }}</p>
        <div class="post-footer">
          <button class="like-button" @click="likePost(post.id)">
            👍 Like 
          </button>
          {{ post.likes }}  
        </div>
      </div>
      <button @click="resetLikes" class="reset-button">Reset Likes</button>
    </div>
  </div>

  </template>
  
  <script>
  import { mapGetters, mapMutations, mapActions } from "vuex";
  
  export default {
    name: "PostsComponent",
    computed: {
      ...mapGetters(["allPosts"]),
      posts() {
        return this.allPosts; // Get posts from Vuex
      },
    },
    methods: {
        ...mapMutations(["incrementLikes"]),
        ...mapActions(["resetAllLikes"]),
        likePost(postId) {
      this.incrementLikes(postId);
    },
      resetLikes() {
      this.resetAllLikes();
    },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  