<template>

    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mt-3">Akusisi data interaksi</h2>

    <div class="inline-block mb-6 py-2  text-sm text-gray-500">
        masukan virus yang akan dianalisis serangga vektornya
    </div>

    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i class="bx bx-search text-2xl text-gray-500"></i>
        </div>
        <input v-model="search" type="search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nama virus.." required />
        <button @click="setupSSE" type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cari interaksi
        </button>
    </div>
    <div class="w-full h-full block">
        <div class="flex items-center justify-between my-2">
            <p ref="persentase_bar" class="text-gray-400 text-sm"></p>
            <p ref="message_bar" class="text-gray-500 text-sm"></p>
        </div>
        <div class="w-full h-2 bg-blue-200 rounded-full hidden">
            <div ref="progress_bar" class="h-full text-center text-xs text-white bg-blue-600 rounded-full animate-pulse">
            </div>
        </div>
    </div>

    <div ref="coba">
    </div>


    <div v-if="node" class="mt-4">Proporsi data: </div>
    <PieProporsi :node="node" v-if="node" :key="node" class="mt-2"/>


    <TableStorageData/>

</template>

<script>
    import PieProporsi from '@/components/chart/PieProporsi.vue';
    import TableStorageData from "@/components/TableStorageData.vue"
    import {_DataFromServerToDF} from '@/helpers/dataframe_helper.js'
import TableStorageDataVue from '@/components/TableStorageData.vue';

    export default {
        name: 'PraprosesView',
        components: {
            PieProporsi,
            TableStorageData,
        },
        data() {
            return {
                node: null,
                edge: null,
                search: null,
            }
        },
        methods: {
            setupSSE() {
                var self = this;
                const virus_txt = this.search;
                const url = "http://127.0.0.1:8009/praproses/";
                var source = new EventSource(url + virus_txt);
                var message_bar = this.$refs.message_bar; 
                var persentase_bar = this.$refs.persentase_bar; 
                var progress_bar = this.$refs.progress_bar; 

                source.onmessage = function (event) {
                    var fromServer = JSON.parse(event.data);
                    console.log(fromServer);
                    if (fromServer.message) {
                        message_bar.innerHTML=fromServer.message;
                    }
                    if (fromServer.progress) {
                        var progress = parseInt(fromServer.progress);
                        progress_bar.parentNode.classList.remove("hidden");
                        progress_bar.style.width = progress + "%";
                        persentase_bar.innerHTML=progress + "%";
                        if (progress >= 100) {
                            progress_bar.classList.remove("animate-pulse");
                            progress_bar.parentNode.classList.add("hidden");
                        }
                    }
                    if (fromServer.df_node) {
                        localStorage.setItem(virus_txt, JSON.stringify({
                            node: fromServer.df_node,
                            edge: fromServer.df_edge,
                        }));
                        self.node = _DataFromServerToDF(JSON.parse(fromServer.df_node));
                        self.edge = _DataFromServerToDF(JSON.parse(fromServer.df_edge));
                    }
                };
                source.onerror = function (event) {
                    console.error("Error receiving progress data:", event);
                    console.error("pesan error", event.data);
                    source.close();
                };
            },
        }
    }
</script>

<style>

</style>