<template>
  <div>
    <div class="posts-container">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-header">
          <span class="post-date">{{ formatDate(post.DATE) }}</span>
        </div>
        <p class="post-text">{{ post.BODY }}</p>
        <div class="post-footer">
        </div>
      </div>
      <button @click="resetLikes" class="reset-button">Reset Likes</button>
      <button @click="openAddPosts" class="reset-button">Add Post</button>
      <button @click="deleteAllPosts" class="reset-button">Delete all</button>
    </div>
  </div>

</template>

<script>

export default {
  name: "PostsComponent",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchAllPosts()
    console.log("mounted")
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    fetchAllPosts() {
      fetch("http://localhost:3000/api/posts")
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message))
    },
    openAddPosts() {
      this.$router.push('addpost')
    },
    deleteAllPosts() {
      fetch("http://localhost:3000/api/posts", {
        method: "DELETE"
      }).then((response) => {
        console.log(response.data);
        location.reload();
      }).catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  },
};
</script>

<style></style>