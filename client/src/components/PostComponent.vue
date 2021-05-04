<template>
  <div id="shell">
    <div id="header">
      <h1 id="logo"><a href="#">MoviesForYou</a></h1>

      <div id="navigation">
        <ul class="list-add-movie">
          <li><a class="active" href="#">HOME</a></li>
          <li><a href="#myBtn" >Add Movie</a></li>
        </ul>
      </div>
      <div id="sub-navigation"></div>
    </div>
    <div id="main">
      <div id="content">
        <div class="box">
          <div
            class="movie"
            v-for="(post, index) in posts"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post._id"
          >
            <div class="movie-image">
              <span class="play"><span class="name"></span></span>
              <a type="button" href="#"
                ><img :src="post.movie_detail.img" alt=""
              /></a>
            </div>
            <div class="rating">
              <p>{{ post.movie_detail.name }}</p>
              <div id="app"></div>
            </div>
          </div>
        </div>
        <!-- Trigger/Open The Modal -->

        <button class="addMovie" id="myBtn">Add new Movie</button>

        <!-- The Modal -->
        <div id="myModal" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <div class="create-post">
              <input
                type="text"
                id="create-post"
                v-model="text"
                placeholder="Enter The Movie Name"
              />
              <br />
              <button class="add-movie" v-on:click="createPost">Add</button>
            </div>
          </div>
        </div>
        <!-- Trigger/Open The Modal -->

        <div id="footer">
          <p class="lf">
            Copyright &copy; 2010 <a href="#">SiteName</a> - All Rights Reserved
          </p>
          <p class="rf">
            Design by
            <a href="http://chocotemplates.com/">ChocoTemplates.com</a>
          </p>

          <div style="clear: both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

// import Preview from "./Preview";
export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
    };
  },
  // components: {
  //   Preview,
  // },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      var api_url =
        "http://www.omdbapi.com/?s=" + this.text + "&apikey=e0620bd4";
      const response = await fetch(api_url);
      var data = await response.json();
      data = data.Search[0];
      console.log(data);
      console.log(Object.keys(data).length);

      await PostService.insertPosts(data);

      this.posts = await PostService.getPosts();
    },
  },
  mounted() {
    var modal = document.getElementById("myModal");
    console.log(this.post);
    var btn = document.getElementById("myBtn");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
      modal.style.display = "block";
    };

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
}
.shell {
  font-size: 12px;
  line-height: 1.3;
  font-family: Arial, Helvetica, Sans-Serif;
  color: #ccc;
  background: url("../images/body-bg.gif");
}
a {
  color: #e7b038;
  text-decoration: underline;
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
a img {
  border: 0;
}
input,
textarea,
select {
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}
textarea {
  overflow: auto;
}
.cl {
  display: block;
  height: 0;
  font-size: 0;
  line-height: 0;
  text-indent: -4000px;
  clear: both;
}
.notext {
  font-size: 0;
  line-height: 0;
  text-indent: -4000px;
}
.left,
.alignleft {
  float: left;
  display: inline;
}
.right,
.alignright {
  float: right;
  display: inline;
}
.text-right {
  text-align: right;
}
h2 {
  font-size: 10px;
  color: #f2a223;
  font-weight: bold;
}
h3 {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}
h4 {
  font-size: 14px;
  color: #f3b12b;
  font-weight: bold;
}
#shell {
  width: 980px;
  margin: 0 auto;
}
#header {
  position: relative;
}
h1#logo {
  position: absolute;
  top: 37px;
  left: 0;
}
/* h1#logo a {
	font-size: 1.5em;
	text-decoration: none;
} */

h1#logo a {
  float: left;
  width: 500px;
  height: 49px;
  background: url("../images/Custom\ Size\ –\ 1.svg") no-repeat 0 0;
  font-size: 0;
  line-height: 0;
  text-indent: -4000px;
}

#navigation {
  float: right;
  clear: right;
  padding-top: 28px;
  padding-bottom: 47px;
  margin-top: 2.5em;
}
#navigation ul {
  list-style: none;
}

#navigation ul li {
  float: left;
  display: inline;
  padding-left: 29px;
}
#navigation ul li a {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}
#navigation ul li a.active,
#navigation ul li a:hover {
  color: #d91d2a;
}
#sub-navigation {
  display: block;
  clear: right;
  border-top: 1px dashed #666;
  border-bottom: 1px dashed #666;
  padding: 8px 0;
}
#sub-navigation ul {
  list-style: none;
}
#sub-navigation ul li {
  float: left;
  display: inline;
  padding-right: 23px;
}
#sub-navigation ul li a {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  line-height: 24px;
  text-decoration: none;
}
#sub-navigation ul li a:hover {
  text-decoration: underline;
}
#search {
  width: 500px;
  margin: 0 0 0 auto;
}
#search label {
  float: left;
  display: inline;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  line-height: 24px;
  padding-right: 6px;
}
#search .search-field {
  width: 238px;
  border: 1px solid #413e3e;
  background: #000;
  color: #787878;
  padding: 2px 0 2px 2px;
}
#search .search-button {
  font-size: 14px;
  font-weight: bold;
  border: 0;
  background: none;
  color: #fff;
  cursor: pointer;
}
#main {
  border-bottom: 1px dashed #413e3e;
  display: block;
}

.box {
  width: 980px;
  border-bottom: 1px dashed #413e3e;
  padding-bottom: 21px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding-top: 2em;
}
.box .head {
  width: 980px;
  padding-top: 14px;
  padding-bottom: 11px;
}
.box .head h2 {
  float: left;
  display: inline;
}
.box .movie {
  width: 152px;
  float: left;
  padding-right: 12px;
  margin-bottom: 1.5em;
}
.movie-image {
  float: left;
  width: 152px;
  height: 214px;
  position: relative;
}
.movie-image img {
  width: 152px;
  height: 214px;
}
.movie-image a {
  float: left;
  display: inline;
  width: 152px;
  height: 214px;
  position: relative;
}
.play {
  position: absolute;
  top: 0;
  left: 0;
  width: 152px;
  height: 214px;
  background: url("../images/hover_bg.svg");
  opacity: 0.5;
  display: block;
  z-index: 5;
  cursor: pointer;
  display: none;
}
.movie span.name {
  font-weight: bold;
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding-top: 160px;
  display: block;
}
.box .last {
  padding: 0;
}
.rating {
  float: left;
  width: 152px;
  padding-top: 8px;
}
.rating p {
  float: left;
  font-size: 10px;
  color: #fff;
  font-weight: bold;
}
.content {
  padding-bottom: 28px;
}
.content img {
  float: left;
  width: 68px;
  padding-right: 8px;
}
.content p {
  font-size: 13px;
  color: #fff;
  line-height: 16px;
}
.content a {
  font-size: 11px;
}
#footer {
  padding: 15px 0 0 0;
  font-size: 10px;
}
#footer,
#footer a {
  color: #9c9c9c;
  text-decoration: none;
}
#footer a:hover {
  text-decoration: none;
}
#footer p {
  margin: 0;
  padding: 0 0 11px 0;
  line-height: normal;
  white-space: nowrap;
}
#footer .lf {
  float: left;
}
#footer .rf {
  float: right;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 500px;
  height: 200px;
  z-index: 2;
  border-radius: 20px;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

#create-post {
  height: 50px;
  width: 500px;
  font-size: 30px;
  font-family: cursive;
  margin-bottom: 1em;
}
.add-movie {
  height: 30px;
  width: 200px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: #343a40;
  color: #f8f9fa;
}
.addMovie {
  height: 30px;
  width: 200px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: #343a40;
  color: #f8f9fa;
}

@media (max-width: 768px) {
  .box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 5em;
    margin-left: 220px;
  }
  .box .movie {
    padding: 0;
    margin: 0;
  }
  .add-movie {
    height: 30px;
    width: 200px;
    margin-right: 10px;
    border-radius: 20px;
    background-color: #343a40;
    color: #f8f9fa;
  }
  #create-post {
    margin-top: 1em;
    width: 400px;
  }
}
@media (max-width: 430px) {
  .box {
    display: grid;
    grid-template-columns: 1fr;
    margin: 5em;
    margin-left: 220px;
  }
  .box .movie {
    padding: 0;
    margin: 0;
  }
  .add-movie {
    height: 30px;
    width: 200px;
    margin-right: 10px;
    border-radius: 20px;
    background-color: #343a40;
    color: #f8f9fa;
  }
  #create-post {
    margin-top: 1em;
    width: 400px;
  }
  #shell{
    width: max-content;
  }
  #list-add-movie{
    display: none;
  }
}
</style>
