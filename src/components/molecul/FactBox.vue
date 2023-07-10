<template>
    <LoadingCenterImage v-if="isLoading" :message="'memuat fact box'" />
    <EmptyComponent v-if="isEmpty" :title="'Data fact box'"/>

    <div v-show="(!isLoading && !isEmpty)" class="p-5 drop-shadow-m rounded-md bg-white w-full grid grid-cols-2 gap-6">
        <div>
            <p class="font-semibold text-lg">Fact Box</p>
            <ul class="font-thin" >
                <li v-for="(value, key) in taxonomy" :key="key">
                    <b class="text-sm">{{ key.toLowerCase() }} : </b>
                    <span >{{value.includes("^")?'-':value}}</span>
                </li>
            </ul>
            <ul class="font-thin" >
                <li v-for="(value, key) in fact" :key="key">
                    <b class="text-sm">{{ key.toLowerCase() }} : </b>
                    <span v-if="value.length==1">{{value[0]}}</span>
                    <div v-if="value.length>1" class="gap-2">
                        <span v-for="(item, key) in value" :key="key">
                            {{item}}, 
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <div class="justify-center">
                <img class="mx-auto" v-if="picture==null" src="@/assets/gambar/insecta.png">
                <img class="mx-auto" v-if="picture" :src="picture">
            </div>
            <div v-if="abstract">Abstract :</div>
            <p class="font-thin text-sm text-justify">
                {{ abstract }}
            </p>
        </div>
    </div>
    <!-- <button @click="cek()">cek</button> -->

</template>

<script>
import axios from "axios";

import LoadingCenterImage from "@/components/atom/LoadingCenterImage.vue";
import EmptyComponent from '@/components/atom/EmptyComponent.vue';

import {_DataFromServerToDF} from '@/helpers/dataframe_helper.js';
import {zip} from "@/helpers/general_helper.js"
import {swalMessageErrorWithTimer} from "@/helpers/sweetAlertHelper.js";
import {useEnhancementDataStore} from "@/stores/EnhancementData.store.js";
import {usePlotlyEmbeddingStore} from "@/stores/PlotlyEmbedding.store.js";
import {rearrangeObject} from "@/helpers/general_helper.js";

export default {
    name: 'FactBox',
    components: {
        LoadingCenterImage,
        EmptyComponent,
    },
    data() {
        return {
            isLoading: true,
            isEmpty: false,
            enhancement_data_store : useEnhancementDataStore(),
            plotly_embedding_store : usePlotlyEmbeddingStore(),
            fact: null,
            picture: null,
            abstract: null,
            taxonomy: null,
        };
    },
    mounted() {
        if(this.enhancement_data_store.wd_id!=null){
            this.showResult(this.enhancement_data_store.wd_id);
        }
    },
    methods: {
        cek(){
            const ncbi_taxon_id=this.enhancement_data_store.ncbi_taxon_id
            // console.log('taxon_name' in this.plotly_embedding_store.dictionary_serangga[ncbi_taxon_id]);
            console.log(this.taxonomy['taxon_name']);
        },
        async showResult(wd_id) {
            this.isLoading=true;
            this.isEmpty= false;
            try {
                // Menggunakan axios untuk melakukan permintaan POST
                let factResponse = axios.get("http://127.0.0.1:8009/enhancement/fact/"+wd_id);
                let pictureResponse = axios.get("http://127.0.0.1:8009/enhancement/picture/"+wd_id);
                let abstractResponse = axios.get("http://127.0.0.1:8009/enhancement/abstract/"+wd_id);
                const [factSolved, pictureSolved, abstractSolved] = await Promise.all([
                    factResponse, pictureResponse, abstractResponse
                ]);
                if (factSolved.data.status=="404" && pictureSolved.data.status=="404" && abstractSolved.data.status=="404")
                    throw new Error("Data fact, picture, dan abstrak tidak ditemukan");
                
                const fact = factSolved.data.fact;
                const picture = pictureSolved.data.picture;
                const abstract = abstractSolved.data.abstract;
                this.fact = fact;
                this.picture = picture;
                this.abstract =  abstract;
                this.enhancement_data_store.$patch({
                    fact: fact,
                    picture: picture,
                    abstract: abstract,
                });
                const ncbi_taxon_id = this.enhancement_data_store.ncbi_taxon_id
                let taxonomy = this.plotly_embedding_store.dictionary_serangga[ncbi_taxon_id]
                taxonomy = rearrangeObject(taxonomy, ['taxon_name','superkingdom','kingdom','phylum','class','order','family','genus','species']);
                this.taxonomy = taxonomy;
            } catch (error) {
                this.isEmpty=true;
                return this.$swal.fire(swalMessageErrorWithTimer(error.message));
            } 
            finally {
                this.isLoading=false;
            }
        },
    },
}
</script>


<style></style>