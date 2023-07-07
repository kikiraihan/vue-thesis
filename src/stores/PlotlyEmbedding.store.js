import { defineStore } from 'pinia'
import { _grupkanDataPerKolom } from '@/helpers/dictionary_serangga_helper.js'

export const usePlotlyEmbeddingStore = defineStore('PlotlyEmbeddingStore', {
    state: () => ({ 
        embeddings: null,
        list_of_entities: null,
        dictionary_serangga: null,
    }),
    getters: {
      grupDictionarySeranggaPerFamili: (state) => {
        const list_of_entities = state.list_of_entities
        const dictionary_serangga = state.dictionary_serangga
        const X = state.embeddings;
        const df_umap = {
            'feature-vector-1': [],
            'feature-vector-2': [],
            'family': [],
            'name': []
        };

        for (let i = 0; i < X.length; i++) {
            const x = X[i];
            const entity = list_of_entities[i];
            
            if (entity !== "http://pyRDF2Vec#SERANGGA_ACUAN") {
              const id_to_get = entity.split("#").pop();
              df_umap['family'].push(dictionary_serangga[id_to_get]['family'].split('_').pop());
              df_umap['name'].push(dictionary_serangga[id_to_get]['taxon_name']);
            } else {
              df_umap['family'].push("#TITIK_VEKTOR_ACUAN");
              df_umap['name'].push("#TITIK_VEKTOR_ACUAN");
            }
            
            df_umap['feature-vector-1'].push(x[0]);
            df_umap['feature-vector-2'].push(x[1]);
        }

        return this._grupkanDataPerKolom(df_umap);
      },
    },
    actions: {
      increment() {
        this.count++
      },
    },
  })