<template>
  <div>
    <LoadingCenterImage v-if="isLoading" :message="'memuat bagan'" />
    <div ref="display" class="rounded-md overflow-hidden"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import LoadingCenterImage from "@/components/atom/LoadingCenterImage.vue";
import {_DataFromServerToDF} from '@/helpers/dataframe_helper.js';
import {useDataToCountStore} from "@/stores/DataToCount.store.js";

export default {
  name: "DegreeCentralityBar",
  // props: {
  //   data_to_count: {
  //     type: Object,
  //   },
  // },
  components: {
    LoadingCenterImage,
  },
  data() {
    return {
      isLoading: true,
      data_to_count: useDataToCountStore().data_to_count,
    };
  },
  // kalo reaktif pake watch masih sering error, entahlah kenapa. tapi ini paling logis.
  // watch: {
  //   data_to_count(newVal, oldVal) {
  //     if(newVal==null){
  //       this.isLoading=true
  //       this.$refs.display.innerHTML=""
  //     }
  //     else{
  //       this.showResult(this.$refs.display, newVal);
  //       this.isLoading=false
  //     }
  //   },
  // },
  mounted() {
    if(this.data_to_count!=null){
      this.showResult(this.$refs.display, this.data_to_count);
      this.isLoading=false
    }
  },
  methods: {
    showResult(container, data_to_count) {
      const df=_DataFromServerToDF(data_to_count);
      
      const sortedData = df.sortBy('dc_result', true).head(10).sortBy('dc_result', false); // dua kali sortby
      const labels = sortedData.toDict()['label'];
      const x = sortedData.toDict()['dc_result'];

      const trace = {
        x: x,
        y: labels,
        type: 'bar',
        orientation: 'h'
      };
      const data = [trace];

      const layout = {
        title: 'Analisis Interaksi',
        xaxis: { 
          title: 'Degree'
        },
        yaxis: { 
          title: 'Insect',
          tickfont: { size: 10 },
          tickangle: 45,
          automargin: true // Adjust layout size based on tick label size
          // titlefont: { size: 16 } // Set x-axis legend size here
        },
      };

      Plotly.newPlot(container, data, layout);
    },
  },
};
</script>

<style></style>