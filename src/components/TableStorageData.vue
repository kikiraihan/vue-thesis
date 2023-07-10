<template>

  <hr class="mt-10 mb-4">

  <div class="home text-center">
    Data interaksi tersimpan
  </div>
  Data anda :
  <ul>
    <li v-for="(item, key) in storage" :key="key">
      <!-- 🦠 🌱🪲 -->
      <!-- <i class='bx bxs-leaf' ></i>
      <i class='bx bxs-virus' ></i>
      <i class='bx bxs-bug' ></i> -->
      <i class='bx bx-network-chart ' ></i>
      {{item}} |
      <button @click="hapusData(item)" class="text-red-400">hapus</button> 
    </li>
  </ul>
  <br>
  <!-- <button @click="addData">add data</button>
  <br>
  <button @click="clearData">clear</button> -->
</template>

<script>
export default {
  name: 'TableStorageData',
  data() {
    return {
      storage: Object.keys(localStorage),
    }
  },
  methods: {
    addData() {
      this.storage.push('4 beg');
      localStorage.setItem('4 beg', JSON.stringify({
        node: ['asdko','pasdlpd'],
        edge: ['adslp','apsld']}
      ));
    },
    clearData() {
      this.storage.forEach((item) => {
        localStorage.removeItem(item)
      });
      this.storage=[];
    },
    hapusData(item) {
      localStorage.removeItem(item);
      this.storage.splice(this.storage.indexOf(item), 1);
    }
  },
}
</script>
