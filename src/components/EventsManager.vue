<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Event Details</h1>
    <h5 class="h5">
      Classes, Workshops, Speaking Engagements and Presentations.
    </h5>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Starts</th>
              <th>Ends</th>
              <th>Title</th>
              <th>Location</th>
              <th>Description</th>
              <th>Action</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td>{{ event.startDate | moment("MMM D, YYYY - h:mm a") }}</td>
              <td>{{ event.endDate | moment("MMM D, YYYY - h:mm a") }}</td>
              <td>{{ event.title }}</td>

              <td>{{ event.location }}</td>
              <td>{{ event.description }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateEventToEdit(event)">Edit</a>
                -
                <a href="#" @click.prevent="deleteEvent(event.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col class="signup-form" lg="3">
        <b-form
          :title="model.id ? 'Edit Event ID#' + model.id : 'New Event'"
          @submit.prevent="saveEvent"
        >
          <h2>New Event</h2>
          <p class="hint-text">Enter details of a new event</p>
          <b-input-group inline>
            <date-picker
              name="dateStart"
              placeholder="Start Date/Time"
              required="required"
              v-model="model.startDate"
              :config="options"
            ></date-picker>
            <date-picker
              name="dateEnd"
              placeholder="End Date/Time"
              required="required"
              v-model="model.endDate"
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
            placeholder="Location"
            required="required"
            v-model="model.location"
          ></b-form-input>
          <b-form-textarea
            rows="3"
            max-rows="6"
            placeholder="Description"
            required="required"
            v-model="model.description"
          ></b-form-textarea>
          <div class="btn">
            <b-btn type="submit" variant="success">Save Event</b-btn>
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
      events: [],
      model: {},
      date: new Date(),
      options: {
        format: "MM/DD/YYYY HH:MM",
        useCurrent: false,
        sideBySide: true,
        icons: {
          time: "fa fa-clock",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: "fa fa-chevron-left",
          next: "fa fa-chevron-right",
          today: "a fa-sun-o",
          clear: "fa fa-trash",
          close: "fa fa-remove"
        }
      }
    };
  },
  components: {
    datePicker
  },
  async created() {
    this.refreshEvents();
  },
  methods: {
    async refreshEvents() {
      this.loading = true;
      this.events = await api.getEvents();
      this.loading = false;
    },
    async populateEventToEdit(event) {
      this.model = Object.assign({}, event);
    },
    async saveEvent() {
      if (this.model.id) {
        await api.updateEvent(this.model.id, this.model);
      } else {
        await api.createEvent(this.model);
      }
      this.model = {}; // reset form
      await this.refreshEvents();
    },
    async deleteEvent(id) {
      if (confirm("Are you sure you want to delete this event?")) {
        // if we are editing a event we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteEvent(id);
        await this.refreshEvents();
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
