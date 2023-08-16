<template>

  <hr class="mt-10 mb-4">

  <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mt-3">Local Storage</h2>
  <div class="inline-block mb-3 py-2 text-sm text-gray-500 text-justify">
    Data interaksi yang tersimpan. Jika data kosong, silahkan melakukan pencarian data interaksi diatas terlebih dahulu atau download example-data di <a href="https://ipb.link/vektorpedia-example-data" class="text-blue-500 underline" target="_blank">link ini</a>. Kemudian lakukan import data.
  </div>
  <div>Data anda :</div>
  <ul>
    <li v-for="(item, key) in storage" :key="key">
      <!-- 🦠 🌱🪲 -->
      <!-- <i class='bx bxs-leaf' ></i>
      <i class='bx bxs-virus' ></i>
      <i class='bx bxs-bug' ></i> -->
      {{key+1}}. <i class='bx bx-network-chart ' ></i> {{item}} 
      | <button @click="hapusData(item)" class="text-red-400">Hapus</button>
      | <button @click="exportOneData(item)" class="text-blue-400">Download</button>
    </li>
  </ul>
  <br>
  <!-- <button @click="addData">add data</button>
  <br>
  <button @click="clearData">clear</button> -->
  <div class="flex gap-2">
    <router-link to="/import-data"
        class="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Import Data
    </router-link>
    <!-- <button @click="exportAllData"
        class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Export Data
    </button> -->
  </div>

  <br><br><br><br><br>
</template>

<script>
import {replaceSpaceWithUnderscore} from '@/helpers/general_helper.js';


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
    },
    exportAllData(){
      this.storage.forEach((item) => {
        // console.log(item);
        this.exportData(item, replaceSpaceWithUnderscore(item));
      });
    },
    exportOneData(item){
      this.exportData(item, replaceSpaceWithUnderscore(item));
    },
    exportData(data_key, file_name) {
      // Retrieve data from localStorage
      const dataToExport = localStorage.getItem(data_key);

      if (dataToExport) {
        // You might want to format the data or process it here
        // For example, converting it to JSON
        const jsonData = JSON.parse(dataToExport);

        // Create a Blob with the data
        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a download link and simulate a click
        const link = document.createElement('a');
        link.href = url;
        link.download = file_name+'.json'; // Change the filename as needed
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
      } else {
        alert('No data to export');
      }
    },
  },
}
</script>
