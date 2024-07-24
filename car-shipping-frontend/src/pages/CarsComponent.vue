<template>
  <div class="row">
    <div class="col-md-12">
      <h2>Cars</h2>
      <button class="btn btn-primary" @click.prevent="addNew = true">Add New Car</button>
      <div class="row" v-if="addNew">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <form @submit.prevent="addNewCar">
              <div class="card-header">
                <h3>Add New Car</h3>
              </div>
              <div class="card-body">
                  <div class="form-group">
                    <label for="make">Make</label>
                    <input type="text" v-model.trim="make" class="form-control" id="make" placeholder="Make">
                  </div>
                  <div class="form-group">
                    <label for="model">Model</label>
                    <input type="text" v-model.trim="model" class="form-control" id="model" placeholder="Model">
                  </div>
                  <div class="form-group">
                    <label for="year">Year</label>
                    <input type="text" v-model.trim="year" class="form-control" id="year" placeholder="Year">
                  </div>
                  <div class="form-group">
                    <label for="vin">VIN</label>
                    <input type="text" v-model.trim="vin" class="form-control" id="vin" placeholder="VIN">
                  </div>
                  <div class="form-group">
                    <label for="shipping_status">Shipping Status</label>
                    <input type="text" v-model.trim="shipping_status" class="form-control" id="shipping_status"
                           placeholder="Shipping Status">
                  </div>
              </div>
              <div class="card-footer text-center">
                <button type="submit" class="btn btn-primary mx-3">Add Car</button>
                <button class="btn btn-danger" @click.prevent="addNew = false">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-if="!addNew">
        <form @submit.prevent="filterRecords">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label for="make">Make</label>
                <input type="text" v-model.trim="make" class="form-control" id="make" placeholder="Make">
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label for="model">Model</label>
                <input type="text" v-model.trim="model" class="form-control" id="model" placeholder="Model">
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label for="year">Year</label>
                <input type="text" v-model.trim="year" class="form-control" id="year" placeholder="Year">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="shipping_status">Shipping Status</label>
                <input type="text" v-model.trim="shipping_status" class="form-control" id="shipping_status"
                       placeholder="Shipping Status">
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label class="invisible" for="shipping_status">Filter</label>
                <button type="submit" class="form-control btn btn-primary">Filter</button>
              </div>
            </div>
          </div>

        </form>
        <table class="table table-striped">
          <thead class="text-xs text-white text-uppercase bg-dark">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Make</th>
            <th class="px-4 py-3">Model</th>
            <th class="px-4 py-3">Year</th>
            <th class="px-4 py-3">VIN</th>
            <th class="px-4 py-3">Shipping Status</th>
            <th class="px-4 py-3">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="car in cars" :key="car.id" class="border-b">
            <td class="px-4 py-3">{{ car.id }}</td>
            <td class="px-4 py-3">{{ car.make }}</td>
            <td class="px-4 py-3">{{ car.model }}</td>
            <td class="px-4 py-3">{{ car.year }}</td>
            <td class="px-4 py-3">{{ car.vin }}</td>
            <td class="px-4 py-3">{{ car.shipping_status }}</td>
            <td class="px-4 py-3">
              <a href="#" class="my-1" @click.prevent="deleteRow(car.id)">Delete</a>
              <select id="" class="form-select" @change.prevent="changeStatus($event, car.id)">
                <option value="">Change Status</option>
                <option value="shipped">Shipped</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
              </select>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="pagination text-center">
          <ul class="list-inline mx-auto" v-if="totalPages">
            <li class="list-inline-item px-1" v-if="current !=1">
              <a href="#" class="text-decoration-none"
                 @click.prevent="nextPage(1)">First</a></li>
            <li class="list-inline-item px-1" v-for="index in totalPages" :key="index">
              <a href="#"
                 class="text-decoration-none"
                 @click.prevent="nextPage(index)">{{
                  index
                }}</a></li>
            <li class="list-inline-item px-1" v-if="totalPages>1 && current != totalPages">
              <a href="#"
                 class="text-decoration-none"
                 @click.prevent="nextPage(totalPages)">Last</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cars: [],
      totalItem: 0,
      perPage: 10,
      totalPages: 0,
      make: '',
      model: '',
      year: '',
      current: 1,
      shipping_status: '',
      addNew: false,
      vin: '',
    }
  },
  mounted() {
    this.getCars({
      page: 1
    })
  },
  methods: {
    getCars(params) {
      axios.get('cars', {
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
        },
        params
      }).then(response => {
        this.cars = response.data.data;
        this.totalItem = response.data.meta.total;
        this.perPage = response.data.meta.per_page;
        this.current = response.data.meta.current_page;
        this.totalPages = Math.ceil(this.totalItem / this.perPage);

      });
    },
    nextPage(page) {
      let params = {
        page: page
      }
      if (this.make !== '') {
        params.make = this.make;
      }
      if (this.model !== '') {
        params.model = this.model;
      }
      if (this.year !== '') {
        params.year = this.year;
      }
      if (this.shipping_status !== '') {
        params.shipping_status = this.shipping_status;
      }

      this.getCars(params);
    },
    filterRecords() {
      let params = {
        page: 1
      }
      if (this.make !== '') {
        params.make = this.make;
      }
      if (this.model !== '') {
        params.model = this.model;
      }
      if (this.year !== '') {
        params.year = this.year;
      }
      if (this.shipping_status !== '') {
        params.shipping_status = this.shipping_status;
      }
      this.getCars(params)
    },
    addNewCar() {
      let car = {
        make: this.make,
        model: this.model,
        year: this.year,
        vin: this.vin,
        shipping_status: this.shipping_status
      }
      axios.post('cars', car, {
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
        }
      }).then(() => {
        //reset the form
        this.make = '';
        this.model = '';
        this.year = '';
        this.vin = '';
        this.shipping_status = '';

        this.showModal = false;
        this.getCars({
          page: 1
        })
      }).catch(error => {
        console.log(error)
      })
    },
    deleteRow(id){
      axios.delete(`cars/${id}`, {
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        this.getCars({
          page: 1
        })
      }).catch(error => {
        console.log(error)
      });
    },
    changeStatus(event, id){
      let status = {
        shipping_status: event.target.value
      }
      axios.patch(`cars/${id}/change-shipping-status`, status, {
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        this.getCars({
          page: 1
        })
      }).catch(error => {
        console.log(error)
      });
    }
  }
}
</script>