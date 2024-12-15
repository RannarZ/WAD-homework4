<template>
  <div id="main-container-addpost">
    <div id="add-post-container" class="posts-container">
      <h3>Add a Post</h3>
      <form id="add-post-form" @submit="addPost">
        <label for="body" id="body-label">Body: </label>
        <input name="body" type="text" id="body" required v-model="post.body" />
        <button class="submit-button">Add Post</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPostPage",
  data() {
    return {
      post: {
        title: "",
        body: "",
        urllink: "",
      },
    };
  },
  methods: {
    getCurrentDate() {
      const today = new Date()
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    addPost() {
      var data = {
        "BODY": this.post.body,
        //date: this.getCurrentDate() //TODO: seda vaja parandada veel
        "DATE": "2003-12-03"
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response.data);
          // redirect to /allposts view
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
  },
};
</script>
<style></style>