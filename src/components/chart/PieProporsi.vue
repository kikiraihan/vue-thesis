<template>
  <div ref="display"></div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
export default {
  name: "PieProporsi",
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.plotPie(this.$refs.display, this.node);
  },
  methods: {
    plotPie(container, df_node) {
      // Mengelompokkan data berdasarkan 'group' dan 'color' dan menghitung jumlah grup
      const groupedData = df_node
        .groupBy("group", "color")
        .aggregate((group) => group.count())
        .rename("aggregation", "count")
        .sortBy("count", true);
      // Mengambil kolom 'group', 'color', dan 'count' dari data yang dikelompokkan
      const labels = groupedData.toDict()["group"];
      const colors = groupedData.toDict()["color"];
      const slices = groupedData.toDict()["count"];

      // english labels
      const replacements = {
        "serangga": "Insect",
        "virus": "Virus",
        "tanaman": "Plant",
      };
      const englishLabels = labels.map(item => replacements[item] || item);

      // set data
      var data = [
        {
          values: slices,
          labels: englishLabels,
          marker: {
            colors: colors,
          },
          type: "pie",
          hoverinfo: "label+percent",
          textinfo: "value",
          textfont: {
            size: 20,
          },
        },
      ];
      // set layout
      var layout = {
        height: 450,
      };
      Plotly.newPlot(container, data, layout);
    },
  },
};
</script>

<style></style>
