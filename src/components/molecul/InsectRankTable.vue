<template>
    <LoadingCenterImage v-if="isLoading" :message="'memuat tabel'" />
    <div class="bg-white pb-2 pt-4 px-2 rounded-md w-full" v-if="!isLoading">
        <!-- <div class="flex justify-between w-full pt-6 ">
            <p class="ml-3"> Users Table</p>
        </div> -->
        <div class="overflow-y-scroll" style="max-height: 400px;">
            <table class="table-auto border-collapse w-full text-center">
                <caption class="caption-top mb-1">
                    <i class="bx bx-bug"></i> Tabel Serangga Vektor Potensial
                </caption>
                <thead>
                    <tr class="rounded-lg text-sm font-medium text-gray-700 bg-gray-200" style="font-size: 0.9674rem">
                        <th class="px-4 py-2">No</th>
                        <th class="px-4 py-2 text-left">Serangga</th>
                        <!-- <th class="px-4 py-2 text-right">Score</th> -->
                        <th class="px-4 py-2 ">Action</th>
                    </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700">
                    <tr class="hover:bg-gray-100 border-b border-gray-200 py-10" v-for="(item, index) in items" :key="item.id">
                        <td class="px-2 py-1">{{index+1}}</td>
                        <td class="px-2 py-1 text-left">{{item[0]}} <span class="text-xs ml-1 text-gray-400">{{item[2]}}</span>
                        </td>
                        <!-- <td class="px-2 py-1 text-right text-gray-400 text-xs"> {{item[1]}}</td> -->
                        <td class="px-2 py-1">
                            <!-- prosesEnhancement(item[0],item[2]) -->
                            <button @click="$emit('proseskanEnhancement',item[2],item[0])" class="bg-blue-500 hover:bg-blue-700 text-white  py-0.5 px-2 rounded-md">
                                Enhance
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="text-xs text-right px-2">
            *Diurutkan berdasarkan final score
        </div>
    </div>
</template>

<script>
import LoadingCenterImage from "@/components/atom/LoadingCenterImage.vue";
import {_DataFromServerToDF} from '@/helpers/dataframe_helper.js';
import {zip} from "@/helpers/general_helper.js"
import {useDataToCountStore} from "@/stores/DataToCount.store.js";

export default {
    name: 'InsectRankTable',
    // props: {
    //     data_to_count: {
    //     type: Object,
    //     },
    // },
    emits: ['proseskanEnhancement'],
    components: {
        LoadingCenterImage,
    },
    data() {
        return {
            isLoading: true,
            items: null,
            data_to_count: useDataToCountStore().data_to_count,
        };
    },
    mounted() {
        if(this.data_to_count!=null){
            this.showResult(this.data_to_count);
            this.isLoading=false
        }
    },
    methods: {
        showResult(data_to_count) {
            const df=_DataFromServerToDF(data_to_count);
            const sortedData = df.sortBy('result', true);//.head(30); //disini jadi true karena pake di perulangan list.
            const labels = sortedData.toDict()['label'];
            const scores = sortedData.toDict()['result'];
            const entity = sortedData.toDict()['entity'];//taxon_id
            this.items = zip(labels, scores, entity);
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