<template style="background: #edf2f7;">
    <main class="min-h-screen w-full bg-gray-100 text-gray-700" x-data="layout">
        <div class="flex h-screen">
            <Sidebar/>
            <div class="w-full md:flex-auto overflow-scroll scroll-m-2">
                <router-view/>
            </div>
        </div>
    </main>

  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

  
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>


<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
