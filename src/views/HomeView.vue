<template>
  <div class="relative my-24">
    <h2 class="w-full text-3xl font-bold text-center sm:text-4xl md:text-5xl">Insect Vectors Search Engine</h2>
    <p class="w-full py-8 mx-auto -mt-2 text-lg text-center text-gray-700 intro sm:max-w-3xl">Leveraging <a href="https://www.globalbioticinteractions.org/" class="text-blue-400">biotic interaction</a> knowledge graph and network analysis to uncover <span class="text-orange-400">insect vectors</span> of plant virus.</p>
  </div>
  <div class="flex flex-col mb-8 animated fadeIn sm:flex-row">
    <div class="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
      <img class="rounded-lg shadow-xl" src="@/assets/gambar/1.jpg" alt="">
    </div>
    <div class="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
      <p class="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">Get Data</p>
      <h3 class="mt-2 text-2xl sm:text-left md:text-4xl">Build insect-virus-plant interaction graph</h3>
      <p class="mt-5 text-lg text-gray-700 text md:text-left">
        Discover graphs of complex interactions between insects, viruses and plants by utilizing data from <a href="https://www.globalbioticinteractions.org/" class="text-blue-400">Global Biotic Interaction (GloBI)</a>. Discover and build graphs just by entering the name of the virus.
      </p>
    </div>
  </div>
  <div class="flex flex-col mb-8 animated fadeIn sm:flex-row">
    <div class="flex items-center mb-8 sm:w-1/2 md:w-5/12">
    <img class="rounded-lg shadow-xl" src="@/assets/gambar/2.jpg" alt="">
    </div>
    <div class="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
      <p class="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">Analyse Data</p>
      <h3 class="mt-2 text-2xl sm:text-left md:text-4xl">Analyse graph to find insect vectors</h3>
      <p class="mt-5 text-lg text-gray-700 text md:text-left">Identify insect vectors through interaction analysis by applying centrality measurements, as well as taxonomic analysis by applying entity embedding. Find out which insect with the highest score as a virus vector.</p>
    </div>
  </div>
  <div class="flex flex-col mb-8 animated fadeIn sm:flex-row">
    <div class="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
      <img class="rounded-lg shadow-xl" src="@/assets/gambar/3.jpg" alt="">
    </div>
    <div class="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
      <p class="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">Enhancement</p>
      <h3 class="mt-2 text-2xl sm:text-left md:text-4xl">Enhance information about identified insect vectors</h3>
      <p class="mt-5 text-lg text-gray-700 text md:text-left">Get complete information about insect vectors through the integration of Wikidata, DBPedia, and NCBIOntology. Understand more about the species predicted to be virus vectors.</p>
    </div>
  </div>

  <div class="flex my-24">
    <router-link to="/praproses" class="px-8 py-3 mx-auto text-lg font-semibold text-white transition duration-200 ease-in-out bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Getting Started</router-link>
  </div>

  <!-- <div class="flex justify-center">
    coba
  </div> -->
</template>





<script>
export default {
  name: 'HomeView',
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
