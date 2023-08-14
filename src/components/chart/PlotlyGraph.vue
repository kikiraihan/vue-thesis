<template>
  <div>
    <LoadingCenterImage v-if="isLoading" :message="'memuat graf'"/>
    <div ref="display"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
import axios from "axios";
import LoadingCenterImage from '@/components/atom/LoadingCenterImage.vue';

export default {
  name: "PlotlyGraph",
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
      isLoading: false
    };
  },
  mounted() {
    this.plotGraph(this.$refs.display, this.node, this.edge);
  },
  methods: {
    async plotGraph(container, node, edge) {
        this.isLoading = true; // Set loading state to true

        // Objek data yang akan dikirim
        const data = {
            node: node,
            edge: edge,
        };

        try {
            // Menggunakan axios untuk melakukan permintaan POST
            const response = await axios.post("http://127.0.0.1:8009/visualisasi/pos", data);
            // Tangani respons dari server
            const pos = response.data.pos;
            const nx_edge = response.data.nx_edge;
            const nx_node = response.data.nx_node;
            const tracer = this._buat_tracer(pos,nx_node,nx_edge);
            this._buat_plot(container, tracer);
            // console.log(nx_node);
        } catch (error) {
            console.error(error);
        } finally { //dijalankan terus, perbedaan dengan diluar try catch lihat di notion belajar javascript
          this.isLoading = false; // Set loading state to false regardless of success or error
        }
    },
    _buat_tracer(pos,nx_node,nx_edge){
      var edge_x = [];
      var edge_y = [];
      var edges = nx_edge;
      for (var i = 0; i < edges.length; i++) {
          var edge = edges[i];
          var x0 = pos[edge[0]][0];
          var y0 = pos[edge[0]][1];
          var x1 = pos[edge[1]][0];
          var y1 = pos[edge[1]][1];
          edge_x.push(x0);
          edge_x.push(x1);
          edge_x.push(null);
          edge_y.push(y0);
          edge_y.push(y1);
          edge_y.push(null);
      }

      var edge_trace = {
          x: edge_x,
          y: edge_y,
          line: { width: 1.5, color: '#888' },
          hoverinfo: 'none',
          mode: 'lines',
          type: 'scatter'
      };

      var node_x = [];
      var node_y = [];
      var node_colors = [];
      var node_text = [];
      Object.keys(nx_node).forEach(function(key) {
        var data = nx_node[key];
        var x = pos[key][0];
        var y = pos[key][1];
        node_x.push(x);
        node_y.push(y);
        node_colors.push(data.color);
        node_text.push(data.label);
      });

      var node_trace = {
          x: node_x,
          y: node_y,
          mode: 'markers', // mode: 'markers+text',
          hoverinfo: 'text',
          marker: {
              reversescale: true,
              color: node_colors,
              size: 10,
              line: { width: 2 }
          },
          text: node_text,
          type: 'scatter'
      };

      var data = [edge_trace, node_trace];

      return data;
    },
    _buat_plot(container, data){
      var fig = {
          data: data,
          layout: {
              title: 'Graf serangga-virus-tanaman',
              titlefont: { size: 16 },
              showlegend: false,
              hovermode: 'closest',
              margin: {
                  b: 20, l: 5, r: 5, t: 40
              },
              annotations: [{
                  text: "Insect-virus-plant",
                  showarrow: false,
                  xref: "paper",
                  yref: "paper",
                  x: 0.005,
                  y: -0.002
              }],
              xaxis: { showgrid: false, zeroline: false, showticklabels: false },
              yaxis: { showgrid: false, zeroline: false, showticklabels: false }
          }
      };

      Plotly.newPlot(container, fig);
    }
  },
};
</script>

<style></style>
