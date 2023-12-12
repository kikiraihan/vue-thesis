<template>
    <LoadingFullPageImage v-if="isFullLoading"/>

    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mt-3">{{$t('AnalyseData.1.title')}}</h2>
    <div class="inline-block mb-6 py-2  text-md text-gray-500 text-justify">
        {{$t('AnalyseData.1.caption')}}
    </div>

    <div class="grid grid-cols-1 gap-2">
        <div>
            <SelectSearchLite :terpilih="pilihan_data_interaksi" @proses-visualisasi="prosesVisualisasi">
                <li v-for="(item, key) in storage" :key="key">
                    <span @click="pilih(item);" class="p-2 block text-black hover:bg-blue-200 cursor-pointer">
                        {{ item }}
                    </span>
                </li>
            </SelectSearchLite>
            <span class="text-sm text-gray-500 pl-2"> {{$t('AnalyseData.1.input.caption')}}</span>
        </div>
    </div>

    <div class="grid grid-cols-3 gap-2 mt-6">
        <div v-if="tahapan>=1" :key="df_node" class="bg-white rounded-md overflow-hidden">
            <!-- <div class="mt-4">Proporsi data:</div> -->
            <PieProporsi :node="df_node"/>
        </div>
        <div v-if="tahapan>=1" :key="server_node" class="col-span-2 bg-white rounded-md overflow-hidden">
            <!-- <div class="mt-4">Graph:</div> -->
            <PlotlyGraph :node="server_node" :edge="server_edge" />
        </div>
        <div v-if="tahapan>=1" :key="server_node" class="col-span-3 bg-white rounded-md overflow-hidden">
            <!-- <div class="mt-4">Graph:</div> -->
            <PlotlyEmbedding :node="server_node" :edge="server_edge" />
        </div>
    </div>


    <div v-if="tahapan>=1" class="mt-12">
        <h3 class="text-3xl font-semibold text-gray-800 dark:text-white">{{$t('AnalyseData.2.title')}}</h3>
        <div class="inline-block mb-6 py-2  text-md text-gray-500 text-justify">
            {{$t('AnalyseData.2.caption')}}
        </div>
    </div>

    <div class="flex bg-neutral-50 rounded-lg p-4 mb-4 text-sm text-neutral-700" role="alert"  v-if="(tampil_proses_analisis) && takson_acuan_rekomendasi">
        <i class='bx bx-info-circle mr-1'></i>
        <div class="text-sm mb-2 text-justify">
            <b class="capitalize" style="color: #671F92">{{pilihan_data_interaksi}}</b> {{$t('AnalyseData.2.input.caption2.1')}} <b class="capitalize" style="color: #671F92">{{takson_virus['family']}}</b>. {{$t('AnalyseData.2.input.caption2.2')}} <b class="capitalize" style="color: #B22222">{{takson_acuan_rekomendasi}}</b>, {{$t('AnalyseData.2.input.caption2.3')}} <b class="capitalize" style="color: #B22222">{{takson_acuan_rekomendasi}}</b>.
        </div>
    </div>

    
    <div v-if="tahapan>=1">
        <div v-if="!tampil_proses_analisis">
            loading...
        </div>
        <div class="relative col-span-2" v-if="tampil_proses_analisis">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="bx bx-bug text-2xl text-gray-500"></i>
            </div>
            <input v-model="takson_acuan" type="search"
                class="block w-full p-4 pl-10 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-inset focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="$t('AnalyseData.2.input.placeholder')" required />
            <button @click="prosesAnalisis" type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {{$t('AnalyseData.2.input.button')}}
            </button>
        </div>
        <span class="text-sm text-gray-500 pl-2" v-if="tampil_proses_analisis"> {{$t('AnalyseData.2.input.caption')}} <!-- dan akan dijadikan acuan untuk mencari vektor virus --></span>
        
    </div>


    <div class="grid grid-cols-2 gap-2 mt-6" v-if="tahapan>=2" :key="data_to_count_store.data_to_count">
        <DegreeCentralityBar class="rounded-md"/>
        <EuclideanDistanceBar class="rounded-md"/>
        <FinalScoreBar class="rounded-md"/>
        <InsectRankTable @proseskan-enhancement="prosesEnhancement" class="rounded-md"/>
    </div>

    <div v-if="tahapan>=3" class="mt-12">
        <h3 class="text-3xl font-semibold text-gray-800 dark:text-white">{{$t('AnalyseData.3.title')}}</h3>
        <div class="inline-block mb-3 py-2  text-sm text-gray-500">
            {{$t('AnalyseData.3.caption')}} <b>{{enhancement_data_store.insect_name}}</b>
        </div>
    </div>

    

    <div class="grid grid-cols-2 gap-2 mt-3" v-if="tahapan>=3" >
        <div class="col-span-2">
            <FactBox :key="enhancement_data_store.wd_id" />
        </div>
        <div >
            <MusuhAlamiTable :key="enhancement_data_store.insect_name"/>
        </div>
        <div >
            <RelativesTable :key="enhancement_data_store.ncbi_taxon_id"/>
        </div>
    </div>


    <br><br><br><br><br><br><br><br>
</template>

<script>
    import axios from "axios";
    //component
    import LoadingFullPageImage from "@/components/atom/LoadingFullpageImage.vue";
    import PieProporsi from "@/components/chart/PieProporsi.vue";
    import PlotlyGraph from "@/components/chart/PlotlyGraph.vue";
    import SelectSearchLite from "@/components/molecul/SelectSearchLite.vue"
    import PlotlyEmbedding from "@/components/chart/PlotlyEmbedding.vue";
    import DegreeCentralityBar from '@/components/chart/DegreeCentralityBar.vue';
    import EuclideanDistanceBar from '@/components/chart/EuclideanDistanceBar.vue';
    import FinalScoreBar from '@/components/chart/FinalScoreBar.vue';
    import InsectRankTable from '@/components/molecul/InsectRankTable.vue';
    import MusuhAlamiTable from '@/components/molecul/MusuhAlamiTable.vue';
    import FactBox from '@/components/molecul/FactBox.vue';
    import RelativesTable from '@/components/molecul/RelativesTable.vue';
    //helpers
    import {_DataFromServerToDF} from "@/helpers/dataframe_helper.js";
    import {_DataFromServerToVisDataset} from "@/helpers/vis_dataset_helper.js";
    import {swalMessageErrorWithTimer} from "@/helpers/sweetAlertHelper.js";
    //stores
    import {useDataToCountStore} from "@/stores/DataToCount.store.js";
    import {useEnhancementDataStore} from "@/stores/EnhancementData.store.js";
    import { usePolaTaksonomiStore } from '@/stores/PolaTaksonomi.store';
    const getStorage = Object.keys(localStorage)

    export default {
        name: "ProsesView",
        components: {
            LoadingFullPageImage,
            SelectSearchLite,
            // tahap 1
            PieProporsi,
            PlotlyGraph,
            PlotlyEmbedding,
            // tahap 2
            DegreeCentralityBar,
            EuclideanDistanceBar,
            FinalScoreBar,
            InsectRankTable,
            // tahap 3
            MusuhAlamiTable,
            FactBox,
            RelativesTable,
        },
        data() {
            return {
                storage: getStorage.filter(item => item !== "locale"),
                server_node: null,
                server_edge: null,
                df_node: null,
                df_edge: null,
                pilihan_data_interaksi: null,
                tahapan:null,//1 selesai parent init visualisasi, 2 selesai parent init analisis
                isFullLoading:false,
                //tahap 1
                pola_taksonomi_store : usePolaTaksonomiStore(),
                takson_virus: null,
                tampil_proses_analisis: false,
                takson_acuan: null,
                takson_acuan_rekomendasi: null,
                //tahap 2
                data_to_count_store : useDataToCountStore(),
                //tahap 3
                enhancement_data_store : useEnhancementDataStore(),
                //env
                VUE_APP_API_URL: process.env.VUE_APP_API_URL,
            };
        },
        methods: {
            pilih(item) {
                this.pilihan_data_interaksi = item;
            },
            updateTahapan(status_baru) {
                this.tahapan = status_baru;
            },
            prosesVisualisasi() {
                if(this.pilihan_data_interaksi==null)
                    return this.$swal.fire(swalMessageErrorWithTimer($t('swal.swalMessageErrorWithTimer.importData')));

                const item = this.pilihan_data_interaksi;
                const ParseFromStorage = JSON.parse(localStorage.getItem(item));
                // masih json dari df pandas  server
                this.server_node = JSON.parse(ParseFromStorage.node);
                this.server_edge = JSON.parse(ParseFromStorage.edge);
                //df_ adalah yang sudah dataframe.js
                this.df_node = _DataFromServerToDF(this.server_node);
                this.df_edge = _DataFromServerToDF(this.server_edge); 
                this.updateTahapan(1);
                this.updateTaksonAcuan();
            },
            async updateTaksonAcuan(){
                this.tampil_proses_analisis = false;
                const data={
                    virus: this.pilihan_data_interaksi,
                };
                try {
                    const response = await axios.post(this.VUE_APP_API_URL+"/proses/get_taxonomy_from_string", data);
                    if(response.data.status==404)
                        throw new Error("Taksonomi virus tidak ditemukan");
                    const takson_virus = response.data.taxonomy;
                    this.takson_virus = takson_virus;
                    if(!('family' in takson_virus))
                        throw new Error("Famili virus tidak ditemukan");
                    const famili_virus = takson_virus['family'];
                    this.takson_acuan = this.pola_taksonomi_store.pola[famili_virus][0]
                    this.takson_acuan_rekomendasi = this.takson_acuan
                } catch (error) {
                    console.error(error);
                    this.takson_acuan ='';
                    this.takson_acuan_rekomendasi = null;
                } finally {
                    this.tampil_proses_analisis = true;
                }
            },
            async prosesAnalisis(){
                this.updateTahapan(2);
                this.data_to_count_store.$reset();
                const data = {
                    node: this.server_node,
                    edge: this.server_edge,
                    acuan_: this.takson_acuan,
                };

                try {
                    const response = await axios.post(this.VUE_APP_API_URL+"/proses/data_to_count", data);
                    this.data_to_count_store.$patch({
                        data_to_count: JSON.parse(response.data.data_to_count),
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async prosesEnhancement(taxon_id,name){
                this.updateTahapan(3);
                this.enhancement_data_store.$reset();

                try {
                    const response = await axios.get(this.VUE_APP_API_URL+"/enhancement/wd-id/"+name);
                    if(response.data.status=="404")
                        throw new Error("WD_ID tidak ditemukan");
                    const wd_id = response.data.wd_id;
                    this.enhancement_data_store.$patch({
                        insect_name: name,
                        ncbi_taxon_id: taxon_id,
                        wd_id: wd_id,
                    });

                } catch (error) {
                    return this.$swal.fire(swalMessageErrorWithTimer(error));
                }
            },

        },
    };
</script>