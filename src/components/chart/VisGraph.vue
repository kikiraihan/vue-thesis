<template>
    <div ref="display"></div>
    <div id="loadingBar">
        <div class="outerBorder">
            <div id="text">0%</div>
            <div id="border">
                <div id="bar"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import { ref,defineProps, toRefs, onMounted } from "vue"

export default {
  name: "VisGraph",
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
  data() {
    return {
      isLoading: false
    };
  },
  mounted() {
    this.set_graph(this.$refs.display, this.node, this.edge)
  },
  methods: {
    set_graph(container, server_node, server_edge) {
      // console.log("server_node", server_node);
      // console.log("server_edge", server_edge);
      const kamus_node = {
        taxon_id: "id",
        taxon_name: "taxon_name",
        taxon_path: "taxon_path",
        taxon_path_ids: "taxon_path_ids",
        taxon_path_rank: "taxon_path_rank",
        superkingdom: "superkingdom",
        kingdom: "kingdom",
        phylum: "phylum",
        class: "class",
        order: "order",
        family: "family",
        genus: "genus",
        species: "species",
        taxon_rank: "taxon_rank",
        group: "group",
        color: "color",
        virus_utama: "virus_utama",
      };
      var records_node = [];
      server_node.data.forEach(function (data_row, data_idx) {
        var record = {};
        server_node.columns.forEach(function (col_row, col_idx) {
          record[kamus_node[col_row]] = data_row[col_idx];
        });
        records_node.push(record);
      });

      const kamus_edge = {
        source_taxon_id: "from",
        target_taxon_id: "to",
        interaction_type: "label",
      };
      var records_edge = [];
      server_edge.data.forEach(function (data_row, data_idx) {
        var record = {};
        server_edge.columns.forEach(function (col_row, col_idx) {
          record[kamus_edge[col_row]] = data_row[col_idx];
        });
        records_edge.push(record);
      });

      const data = {
        nodes: new DataSet(records_node),
        edges: new DataSet(records_edge),
      };
      const options = {
        autoResize: true,
        height: '450px',
        width: '100%',
      };
      const ininetwork = new Network(container, data, options);
      ininetwork.on("stabilizationProgress", function(params) {
      		document.getElementById('loadingBar').removeAttribute("style");
	        var maxWidth = 496;
	        var minWidth = 20;
	        var widthFactor = params.iterations/params.total;
	        var width = Math.max(minWidth,maxWidth * widthFactor);

	        document.getElementById('bar').style.width = width + 'px';
	        document.getElementById('text').innerHTML = Math.round(widthFactor*100) + '%';
	    });
	    ininetwork.once("stabilizationIterationsDone", function() {
	        document.getElementById('text').innerHTML = '100%';
	        document.getElementById('bar').style.width = '496px';
	        document.getElementById('loadingBar').style.opacity = 0;
	        // really clean the dom element
	        setTimeout(function () {document.getElementById('loadingBar').style.display = 'none';}, 500);
	    });
    },
  },
};

</script>

<style></style>
