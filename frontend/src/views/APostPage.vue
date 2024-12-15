<template>
  <div class="A Post">
    <div id="form">
      <h3>A Post</h3>
      <label for="body">Body: </label>
      <input name="body" class="post-text" id="body" required v-model="post.body" />
    
    </div>
    <div class="button-container">
      <button @click="updatePost(this.$route.params.id)" class="button">Update </button>
      <button @click="deletePost(this.$route.params.id)" class="button">Delete </button>
    </div>
  </div>
</template>


<script>
export default {
  name: "APostPage",
  data() {
    return {
      post: {
        id: "",
        body: "",
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
    fetchAPost(id) {
      
      // fetch one post with the specied id (id)
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    updatePost(id) {
      console.log(id)
      // using Fetch - put method - updates a specific post based on the passed id and the specified body
      fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      BODY: this.post.body, 
      DATE: this.getCurrentDate() 
    }),
      })
        .then((response) => {
          console.log(response.data);
          //this.$router.push("/apost/" + this.post.id);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push('/');
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePost(id) {
      // using Fetch - delete method - delets a specific post based on the passed id
      fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response.data);
          // We are using the router instance of this element to navigate to a different URL location
          //this.$router.push("/");
          this.$router.push('/');

        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    // call fetchAPost() when this element mounts, and pass to it a route parameter  (id)
    // Route parameters (this.$route.params.id) are named URL segments that are used to capture the values specified at their 
    // position in the URL. The captured values are populated in the req.params object, with the name 
    // of the route parameter specified in the path as their respective keys
    this.fetchAPost(this.$route.params.id);
  },
};
</script>

<style scoped>
#form {
  max-width: 420px;
  margin: 30px auto;
  background: #555555;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

h3 {
  text-align: center;
  color: white;
}

label {
  color: white;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: white;
}

</style>