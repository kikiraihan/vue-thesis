<template>
    <!-- <div class="home text-center">proses</div> -->
    <!-- Data anda :
    <ul>
        <li v-for="(item, key) in storage" :key="key">
            <i class="bx bxs-leaf"></i>
            <i class="bx bxs-virus"></i>
            <i class="bx bxs-bug"></i>
            {{ item }} |
            <button @click="pilih(item)" class="text-blue-400">proses</button>
        </li>
    </ul> -->

    <div class="grid grid-cols-3 gap-2 mt-6">
        <!-- <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="bx bxs-virus text-2xl text-gray-500"></i>
            </div>
            <input v-model="search" type="search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Virus.." required />
        </div> -->

        <SelectSearchLite :terpilih="search">
            <li v-for="(item, key) in storage" :key="key">
                <span @click="pilih(item);" class="p-2 block text-black hover:bg-blue-200 cursor-pointer">
                    <i class="bx bxs-virus"></i> {{ item }}
                </span>
            </li>
        </SelectSearchLite>
        <div class="relative col-span-2">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="bx bx-bug text-2xl text-gray-500"></i>
            </div>
            <input v-model="takson_acuan" type="search"
                class="block w-full p-4 pl-10 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-inset focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Takson acuan serangga.." required />
            <button @click="proses" type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Proses
            </button>
        </div>
    </div>

    <div class="grid grid-cols-3 gap-2 mt-6">
        <div v-if="df_node" :key="df_node" class="bg-white rounded-md overflow-hidden">
            <!-- <div class="mt-4">Proporsi data:</div> -->
            <PieProporsi :node="df_node"/>
        </div>
        <div v-if="server_node" :key="server_node" class="col-span-2 bg-white rounded-md">
            <!-- <div class="mt-4">Graph:</div> -->
            <PlotlyGraph :node="server_node" :edge="server_edge" />
        </div>
    </div>

    <div class="grid grid-cols-4 gap-2 mt-6">
        <div v-if="server_node" :key="server_node" class="col-span-3 bg-white rounded-md">
            <!-- <div class="mt-4">Graph:</div> -->
            <PlotlyEmbedding :node="server_node" :edge="server_edge" />
        </div>
    </div>
</template>

<script>
    import PieProporsi from "@/components/chart/PieProporsi.vue";
    import PlotlyGraph from "@/components/chart/PlotlyGraph.vue";
    import SelectSearchLite from "@/components/molecul/SelectSearchLite.vue"
    import PlotlyEmbedding from "@/components/chart/PlotlyEmbedding.vue";
    import {_DataFromServerToDF} from "@/helpers/dataframe_helper.js";
    import {_DataFromServerToVisDataset} from "@/helpers/vis_dataset_helper.js";
import PlotlyEmbeddingVue from '@/components/chart/PlotlyEmbedding.vue';

    export default {
        name: "ProsesView",
        components: {
            PieProporsi,
            PlotlyGraph,
            SelectSearchLite,
            PlotlyEmbedding,
        },
        data() {
            return {
                storage: Object.keys(localStorage),
                server_node: null,
                server_edge: null,
                df_node: null,
                df_edge: null,
                search: "...",
                takson_acuan: null,
            };
        },
        methods: {
            pilih(item) {
                this.search = item;
            },
            proses() {
                const item = this.search;
                const takson_acuan = this.takson_acuan;
                const ParseFromStorage = JSON.parse(localStorage.getItem(item));
                this.server_node = JSON.parse(ParseFromStorage.node);
                this.server_edge = JSON.parse(ParseFromStorage.edge);
                this.df_node = _DataFromServerToDF(this.server_node);
                this.df_edge = _DataFromServerToDF(this.server_edge); 
            },
        },
    };
</script>