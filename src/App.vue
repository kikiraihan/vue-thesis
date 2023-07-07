<template style="background: #edf2f7;">
  <main class="min-h-screen w-full bg-gray-100 text-gray-700" x-data="layout">

      <Navbar />

    <div class="flex h-screen">
      <!-- <Sidebar /> -->
      <div class="w-full md:flex-auto overflow-scroll scroll-m-2">
        <div class="p-4 mx-auto md:w-3/4">
          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'App',
    metaInfo: {
      title: 'Vue vektor',
      meta: [{
          name: 'description',
          content: 'aplikasi untuk membantu identifikasi vektor virus tipe serangga'
        },
        {
          name: 'author',
          content: 'kikikatili'
        },
        {
          name: 'keywords',
          content: 'vektor, virus, serangga, aplikasi, identifikasi'
        },
      ]
    },
    components: {
      Sidebar,
      Navbar
    },
    mounted() {
      // if(localStorage.getItem('graph')==null) localStorage.setItem('graph', JSON.stringify({}))
      // const ini = localStorage.getItem('data')
      // console.log(ini)
    },
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