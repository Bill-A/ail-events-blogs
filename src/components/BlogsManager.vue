<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Blog Details</h1>
    <h5 class="h5">
      Thoughts, conversations and ramblings on all things agile.
    </h5>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Link</th>
              <th>Action</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in blogs" :key="blog.id">
              <td>{{ blog.publicationDate }}</td>
              <td>{{ blog.title }}</td>
              <td>{{ blog.subTitle }}</td>
              <td>{{ blog.shortDescription }}</td>
              <td>{{ blog.url }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateBlogToEdit(blog)">Edit</a>
                -
                <a href="#" @click.prevent="deleteBlog(blog.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col class="signup-form" lg="3">
        <b-form
          :title="model.id ? 'Edit Blog ID#' + model.id : 'New Blog'"
          @submit.prevent="saveBlog"
        >
          <h2>New Blog</h2>
          <p class="hint-text">Enter details of a blog entry</p>
          <b-input-group inline>
            <date-picker
              name="date"
              placeholder="Date"
              required="required"
              v-model="model.publicationDate"
              :config="options"
            ></date-picker>
          </b-input-group>
          <b-form-input
            type="text"
            class="form-control"
            placeholder="Title"
            required="required"
            v-model="model.title"
          ></b-form-input>
          <b-form-input
            type="text"
            class="form-control"
            placeholder="Subtitle"
            required="required"
            v-model="model.subTitle"
          ></b-form-input>
          <b-form-textarea
            rows="3"
            max-rows="6"
            placeholder="Description"
            required="required"
            v-model="model.shortDescription"
          ></b-form-textarea>
          <b-form-input
            type="text"
            class="form-control"
            placeholder="Link to Blog"
            required="required"
            v-model="model.url"
          ></b-form-input>
          <div class="btn">
            <b-btn type="submit" variant="success">Save Blog</b-btn>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from "@/api";
import datePicker from "vue-bootstrap-datetimepicker";
import "bootstrap/dist/css/bootstrap.css";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

export default {
  data() {
    return {
      loading: false,
      blogs: [],
      model: {},
      date: new Date(),
      options: {
        format: "MM/DD/YYYY",
        useCurrent: false
      }
    };
  },
  components: {
    datePicker
  },
  async created() {
    this.refreshBlogs();
  },
  methods: {
    async refreshBlogs() {
      this.loading = true;
      this.blogs = await api.getBlogs();
      this.loading = false;
    },
    async populateBlogToEdit(blog) {
      this.model = Object.assign({}, blog);
    },
    async saveBlog() {
      if (this.model.id) {
        await api.updateBlog(this.model.id, this.model);
      } else {
        await api.createBlog(this.model);
      }
      this.model = {}; // reset form
      await this.refreshBlogs();
    },
    async deleteBlog(id) {
      if (confirm("Are you sure you want to delete this blog?")) {
        // if we are editing a blog we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteBlog(id);
        await this.refreshBlogs();
      }
    }
  }
};
</script>

<style scoped>
body {
  color: #fff;
  background: #63738a;
  font-family: "Roboto", sans-serif;
}

.form-control {
  height: 40px;
  box-shadow: none;
  color: #969fa4;
  margin-top: 20px;
}

.form-control:focus {
  border-color: #5cb85c;
}

.form-control,
b-btn {
  border-radius: 3px;
}

.signup-form {
  width: 400px;
  margin: 0px 15px 0px 0px;
}

.signup-form h2 {
  color: #636363;
  margin: 0 0 15px;
  position: relative;
  text-align: center;
}

.signup-form h2:before,
.signup-form h2:after {
  content: "";
  height: 2px;
  width: 30%;
  background: #d4d4d4;
  position: absolute;
  top: 50%;
  z-index: 2;
}

.signup-form h2:before {
  left: -15px;
}

.signup-form h2:after {
  right: -15px;
}

.signup-form .hint-text {
  color: #999;
  margin-bottom: -10px;
  text-align: center;
}

.signup-form form {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #f2f3f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}

.signup-form {
  margin-bottom: 20px;
}

.btn {
  font-size: 16px;
  font-weight: bold;
  width: 110px;
  outline: none !important;
  margin: 5px 0 0 -5px;
}

.signup-form a {
  color: #fff;
  text-decoration: underline;
}

.signup-form a:hover {
  text-decoration: none;
}

.signup-form form a {
  color: #5cb85c;
  text-decoration: none;
}

.signup-form form a:hover {
  text-decoration: underline;
}
</style>
