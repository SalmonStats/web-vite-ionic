<script setup lang="ts">
import { ChartOptions } from '@/types/charts';

interface ChartProps {
  options: Partial<ChartOptions>;
  series: number[]
}


const options = {
  chart: {
    id: "vuechart-example"
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
}

const series = [
  {
    name: "Counts",
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  },
  {
    name: "Kill Counts",
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  }
]
const props = defineProps<ChartProps>()
</script>

<template>
  <div>
    <ApexCharts width="100%" type="bar" :options="options" :series="series"></ApexCharts>
  </div>
</template>
