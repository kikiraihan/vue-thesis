<template>
    <LoadingCenterImage v-if="isLoading" :message="'memuat tabel'" />
    <EmptyComponent v-if="isEmpty" :title="'Data kerabat takson'"/>
    <div class="bg-white pb-4 pt-2 px-2 rounded-md w-full" v-show="(!isLoading && !isEmpty)">
        <div class="overflow-y-scroll" style="max-height: 400px;">
            <table class="table-auto border-collapse w-full text-center">
                <caption class="caption-top mb-1">
                    <i class="bx bx-bug"></i> Kerabat takson {{name}}
                </caption>
                <thead>
                    <tr class="rounded-lg text-sm font-medium text-gray-700 bg-gray-200" style="font-size: 0.9674rem">
                        <th class="px-4 py-2">No</th>
                        <th class="px-4 py-2 text-left">Serangga</th>
                        <th class="px-4 py-2 text-right">Tingkatan</th>
                    </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700">
                    <tr class="hover:bg-gray-100 border-b border-gray-200 py-10" v-for="(item, index) in items" :key="item.id">
                        <td class="px-2 py-1">{{index+1}}</td>
                        <td class="px-2 py-1 text-left">{{item[0]}} <span class="text-xs ml-1 text-gray-400">{{item[2]}}</span>
                        </td>
                        <td class="px-2 py-1 text-right text-gray-400 text-xs"> {{item[1]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- <button @click="cek()">cek</button> -->
</template>

<script>
import axios from "axios";

import LoadingCenterImage from "@/components/atom/LoadingCenterImage.vue";
import EmptyComponent from '@/components/atom/EmptyComponent.vue';

import {_DataFromServerToDF} from '@/helpers/dataframe_helper.js';
import {swalMessageErrorWithTimer} from "@/helpers/sweetAlertHelper.js";
import {useEnhancementDataStore} from "@/stores/EnhancementData.store.js";

export default {
    name: 'RelativesTable',
    components: {
        LoadingCenterImage,
        EmptyComponent,
    },
    data() {
        return {
            isLoading: true,
            isEmpty: false,
            items: null,
            enhancement_data_store : useEnhancementDataStore(),
            //env
            VUE_APP_API_URL: process.env.VUE_APP_API_URL,
        };
    },
    mounted() {
        if(this.enhancement_data_store.ncbi_taxon_id!=null){
            this.showResult(this.enhancement_data_store.ncbi_taxon_id);
        }
    },
    methods: {
        cek(){
            console.log(this.enhancement_data_store);
        },
        async showResult(taxon_id) {
            this.isLoading=true;
            this.isEmpty= false;
            console.log(taxon_id);
            try {
                // Menggunakan axios untuk melakukan permintaan POST
                const response = await axios.get(this.VUE_APP_API_URL+"/enhancement/relatives/"+taxon_id);
                if(response.data.status=="404")
                    throw new Error("Data kerabat tidak ditemukan");
                const relatives = response.data.relatives;
                this.enhancement_data_store.$patch({
                    relatives: relatives
                });
                this.items= relatives;//zip(musuh_alami.node, musuh_alami.edge);
                this.isLoading=false;
            } catch (error) {
                this.isEmpty=true;
                this.isLoading=false;
                return this.$swal.fire(swalMessageErrorWithTimer(error.message));
            } 
        },
    },
}
</script>


<style>
    thead tr th:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    thead tr th:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    tbody tr td:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 0px;
    }

    tbody tr td:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 0px;
    }
</style>