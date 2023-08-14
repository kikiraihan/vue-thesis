<template>
  <div class="home text-center">Import Data</div>

  <div class="mb-4">
    <input type="file" multiple @change="handleFilesChange" />
    <ul v-if="importedData.length > 0">
      <li v-for="(item, index) in importedData" :key="index">{{ item }}</li>
    </ul>
  </div>

  <router-link to="/praproses"
      class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
      Kembali
  </router-link>
</template>

<script>

import {replaceUnderscoreWithSpace} from '@/helpers/general_helper.js';
import {swalAdded} from '@/helpers/sweetAlertHelper.js';

export default {
  name: 'ImportDataView',
  data() {
    return {
      importedData: [],
    };
  },
  methods: {
    handleFilesChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const filename = replaceUnderscoreWithSpace(file.name);
          const virus_txt = filename.replace(/\.json$/, "");
          const reader = new FileReader();
          reader.onload = () => {
            try {
              localStorage.setItem(virus_txt.toLowerCase(), reader.result);
              this.$swal.fire(swalAdded(filename+" berhasil ditambahkan"));
              this.importedData.push(filename);
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          };
          reader.readAsText(file);
        }
      }
    },
  },
};
</script>
