<template>
  <div>
    <!-- <span>ini final score</span> -->
    <LoadingCenterImage v-if="isLoading" :message="$t('loading.message.bar')" />
    <div ref="display" class="rounded-md overflow-hidden"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import LoadingCenterImage from "@/components/atom/LoadingCenterImage.vue";
import {_DataFromServerToDF} from '@/helpers/dataframe_helper.js';
import {useDataToCountStore} from "@/stores/DataToCount.store.js";

export default {
  name: "FinalScoreBar",
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
  mounted() {
    if(this.data_to_count!=null){
      this.showResult(this.$refs.display, this.data_to_count);
      this.isLoading=false
    }
  },
  methods: {
    showResult(container, data_to_count) {
      const df=_DataFromServerToDF(data_to_count);
      // dua kali sortby. pertama urut untuk memotong 10 jadi terbalik, kedua urut untuk membalikkan lagi.
      const sortedData = df.sortBy('result', true).head(10).sortBy('result', false); 
      const labels = sortedData.toDict()['label'];
      const x = sortedData.toDict()['result'];

      const trace = {
        x: x,
        y: labels,
        type: 'bar',
        orientation: 'h'
      };
      const data = [trace];

      const layout = {
        title: this.$t('FSBar.title'),
        xaxis: { title: 'Score' },
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