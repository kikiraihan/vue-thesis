<template>
  <div>
    <LoadingCenterImage v-if="isLoading" :message="'memuat embedding'" />
    <div ref="display"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
// import { UMAP } from 'umap-js';
import axios from "axios";
import LoadingCenterImage from "@/components/atom/LoadingCenterImage.vue";
import {_grupkanDataPerKolom} from "@/helpers/dictionary_serangga_helper.js";
import {usePlotlyEmbeddingStore} from "@/stores/PlotlyEmbedding.store.js";

export default {
  name: "PlotlyEmbedding",
  props: {
    node: {
      type: Object,
      required: true,
    },
    edge: {
      type: Object,
      required: true,
    },
  },
  components: {
    LoadingCenterImage,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.plotEmbedding(this.$refs.display, this.node, this.edge);
  },
  methods: {
    async plotEmbedding(container, node, edge) {
      this.isLoading = true; // Set loading state to true

      // Objek data yang akan dikirim
        const data = {
            node: node,
            edge: edge,
        };

        try {
          // Menggunakan axios untuk melakukan permintaan POST
          const response = await axios.post("http://127.0.0.1:8009/visualisasi/embedding", data);
  
          const data_store = usePlotlyEmbeddingStore();
  
          // Tangani respons dari server
          data_store.$patch({
            embeddings: response.data.embeddings,
            list_of_entities: response.data.list_of_entities,
            dictionary_serangga: response.data.dictionary_serangga,
          });
          
          const tracer = this._buat_tracer(
            data_store.embeddings,
            data_store.list_of_entities,
            data_store.dictionary_serangga,
          );
  
          this._buat_plot(container, tracer);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false; // Set loading state to false regardless of success or error
        }
    },
    _buat_tracer(embeddings, list_of_entities, dictionary_serangga){
        const X = embeddings;
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

        const groupedData = _grupkanDataPerKolom(df_umap);
        const keys = Object.keys(groupedData);

        var data = [];
        keys.forEach(key => {
            var node_trace = {
                x: groupedData[key]['feature-vector-1'],
                y: groupedData[key]['feature-vector-2'],
                mode: 'markers+text',
                type: 'scatter',
                name: key,
                text: key,//groupedData[key]['name'],
                textfont : {
                    family:'Times New Roman'
                },
                textposition: 'bottom center',
                marker: {
                    reversescale: true,
                    // symbol:'square',//  # 'triangle-down' can be used for downward-pointing triangles
                    // color: node_colors,
                    size: 10,//12
                    line: { width: 2 },
                },
                hovertext:groupedData[key]['name'],  //# Set the hover text
                hoverinfo:'text'  //# Display only text in hover
            };
            data.push(node_trace)
            // console.log(key);
        });
        return data;
    },
    _buat_plot(container, data){
        var fig = {
            data: data,
            layout: {
                legend: {
                    y: 0.5,
                    x: -0.005,
                    xref: "paper",
                    yref: 'paper',
                    font: {
                        family: 'Arial, sans-serif',
                        size: 12,
                        color: 'grey',
                    },
                    // Mengatur orientasi legenda menjadi vertikal untuk memperjelas pengurutan
                    // orientation: 'v',
                    // // Mengatur urutan legenda berdasarkan urutan yang telah diurutkan
                    // traceorder: 'normal'
                },
                title: 'Embedding taksonomi serangga',
                titlefont: { size: 16 },
                showlegend: true,
                hovermode: 'closest',
                margin: {
                    b: 20, l: 5, r: 5, t: 40
                },
                annotations: [{
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.005,
                    xanchor: 'left',
                    y: 1.040,
                    yanchor: 'top',
                    text: 'Family',
                    showarrow: false
                }],
                xaxis: { showgrid: false, zeroline: false, showticklabels: false },
                yaxis: { showgrid: false, zeroline: false, showticklabels: false }
            }
        };

        Plotly.newPlot(container, fig);
    },
  },
};
</script>

<style></style>