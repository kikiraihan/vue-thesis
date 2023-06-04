<template>
  <div class="home text-center">
    halaman home
  </div>
  {{data}}
  <button @click="getData">get data</button>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      data: localStorage.getItem('data')
    }
  },
  methods: {
    getData() {
      localStorage.setItem('data', 'ini data dari home')
    }
  },
}
</script>
