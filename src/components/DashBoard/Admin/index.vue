<template>
  <div>
    <bar-chart></bar-chart>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import BarChart from "./BarChart.vue";
@Component({
  name: "eidtor",
  components: {
    BarChart
  }
})
export default class extends Vue {}
</script>