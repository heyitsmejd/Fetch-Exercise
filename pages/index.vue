<template>
  <div class="container">
    <table class="table" id="orders" >
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>List Id</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td>Loading orders..</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{order.id}}</td>
            <td>{{order.name}}</td>
            <td>{{order.listId}}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: false,
      requestError: false,
      loading: true
    }
  },
  mounted() {
    // Call our endpoint that fetches "https://fetch-hiring.s3.amazonaws.com/hiring.json"
    // This is just a small back end to retrieve the json, since we can't do it locally due to CORS issues.
    this.$axios.get('/api/orders').then(resp => {
      // Filter and sort the returned data
      this.orders = this.sortOrders(this.filterNullBlank(resp.data))

      // turn off loading
      this.loading = false
    }).catch(e => {
      this.requestError = e
      this.loading = false
    })
  },
  methods: {
    // filterNullBlank takes an array and returns an array where the name is not null and the length is greater than 0.
    filterNullBlank(orders){
      return orders.filter(order => order.name !== null && order.name.length > 0)
    },
    // sortOrders sorts in two ways, firstly ascending by listId. However, some listids are the same, in which case it'll check the item name and sort by that.
    sortOrders(orders){
      return orders.sort((a, b) => {
        if (a.listId > b.listId) return 1;
        if (a.listId < b.listId) return -1;

        // If we just did a generic ascending sort, the names would be out of order since we're comparing strings. We've gotta convert the actual order strings to numbers. 
        // Because our expected format is "Item #" we can assume that starting from the 5th index it will be a number.
        // Future: we can add a check if this value does not follow the format, and can show those above or below depending on requirements.
        if (Number(a.name.substring(5,a.name.length)) > Number(b.name.substring(5,b.name.length))) return 1;
        if (Number(a.name.substring(5,a.name.length)) < Number(b.name.substring(5,b.name.length))) return -1
      })
    }
  }
}
</script>
