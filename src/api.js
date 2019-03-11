import Vue from "vue";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001/",
  json: true
});

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken();
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data;
    });
  },
  /* Event db actions */
  getEvents() {
    return this.execute("get", "/events");
  },
  getEvent(id) {
    return this.execute("get", `/events/${id}`);
  },
  createEvent(data) {
    return this.execute("post", "/events", data);
  },
  updateEvent(id, data) {
    return this.execute("put", `/events/${id}`, data);
  },
  deleteEvent(id) {
    return this.execute("delete", `/events/${id}`);
  },

  /* Blog db actions */
  getBlogs() {
    return this.execute("get", "/blogs");
  },
  getBlog(id) {
    return this.execute("get", `/blogs/${id}`);
  },
  createBlog(data) {
    return this.execute("post", "/blogs", data);
  },
  updateBlog(id, data) {
    return this.execute("put", `/blogs/${id}`, data);
  },
  deleteBlog(id) {
    return this.execute("delete", `/blogs/${id}`);
  }
};
