import { defineStore } from 'pinia'
// import { _grupkanDataPerKolom } from '@/helpers/dictionary_serangga_helper.js'

export const useEnhancementDataStore = defineStore('EnhancementDataStore', {
    state: () => ({ 
        insect_name: null,
        ncbi_taxon_id: null,
        wd_id: null,
        picture: null,
        fact_dict: null,
        abstract: null,
        musuh_alami: {
            node: null, 
            edge: null
        },
        relatives: null,
    }),
    getters: {},
    actions: {},
})