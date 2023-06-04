<template>
  <aside
    class="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <a class="flex items-center gap-2">
      <img class="w-auto h-8" src="@/assets/logo-2.png" alt="">
      <span class="font-bold uppercase text-2xl">Hama</span>
    </a>

    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav class="-mx-3 space-y-6 ">
        <div class="space-y-3">
          <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">analytics</label>
          <div>
            <router-link v-for="route in routes" :key="route.path" :to="route.path"
              class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 ">
              <i :class="[route.icon, 'text-2xl']"></i>
              <span class="mx-2 text-sm font-medium">{{ route.title }}</span>
            </router-link>
          </div>
        </div>

      </nav>
    </div>
  </aside>

</template>

<script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        routes: [
          { path: "/", title: "Home", icon: "bx bx-home" },
          { path: "/praproses", title: "Praproses", icon: "bx bx-file-find" },
          // { path: "/proses", name: "proses", icon: "bx bx-analyse" },
          // { path: "/visualisasi", name: "visualisasi", icon: "bx bx-network-chart"},
        ]
      };
    },
  }
</script>

<style>

</style>