<template>
    <nav
        class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between  px-6 bg-white shadow sm:items-baseline w-full">
        <a class="flex items-center py-3">
            <!-- <img class="w-auto h-8 inline" src="@/assets/logo-2.png" alt=""/> -->
            <i class="bx bxs-bug text-2xl text-orange-300 rotate-12"></i>
            <span class="font-bold text-2xl" style="font-family: 'Oswald', sans-serif;"><span class="text-orange-300">Vektor</span>pedia</span>
        </a>
        <div class="flex flex-row">
            <router-link v-for="route in routes" :key="route.path" :to="route.path"
              class="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 flex flex-row items-center">
              <i :class="[route.icon, 'text-2xl']"></i>
              <span class="mx-2 text-sm font-medium">{{ route.title }}</span>
            </router-link>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                routes: [
                // { path: "/", title: "Home", icon: "bx bx-home" },
                { path: "/praproses", title: "Get Data", icon: "bx bx-file-find" },
                { path: "/proses", title: "Analyse Data", icon: "bx bx-analyse" },
                // { path: "/visualisasi", name: "visualisasi", icon: "bx bx-network-chart"},
                ]
            };
        },
    }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Koulen&family=Montserrat:wght@100;400;500;700&family=Oswald:wght@400;600&family=Passion+One&family=Unica+One&display=swap');
</style>