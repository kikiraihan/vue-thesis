import { defineStore } from 'pinia'

export const usePolaTaksonomiStore = defineStore('PolaTaksonomiStore', {
    state: () => ({ 
        pola: {
            // family virus          // family serangga
            "NCBI:39740_Bromoviridae": ["Aphididae"],
            "NCBI:69973_Closteroviridae": ["Aleyrodidae"],
            "NCBI:675072_Secoviridae": ["Cicadellidae"],
            "NCBI:10811_Geminiviridae": ["Aleyrodidae"],
            "NCBI:2169577_Solemoviridae": ["Aphididae"],
            "NCBI:1980419_Tospoviridae": ["Thripidae"],
            "NCBI:11270_Rhabdoviridae": ["Delphacidae", "Cicadellidae"],
            "NCBI:1980418_Phenuiviridae": ["Delphacidae"],
            "NCBI:10880_Reoviridae": ["Delphacidae"],
        },
    }),
    getters: {},
    actions: {},
})

// data_to_count : dataframe dengan kolom [label, entity, dc_result, ed_result, ed_result_scaled, dc_result_scaled, result]