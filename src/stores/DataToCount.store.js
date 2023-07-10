import { defineStore } from 'pinia'
import { _grupkanDataPerKolom } from '@/helpers/dictionary_serangga_helper.js'

export const useDataToCountStore = defineStore('DataToCountStore', {
    state: () => ({ 
        data_to_count: null,
    }),
    getters: {},
    actions: {},
})

// data_to_count : dataframe dengan kolom [label, entity, dc_result, ed_result, ed_result_scaled, dc_result_scaled, result]