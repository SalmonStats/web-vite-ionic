<script setup lang="ts">
import { ChartOptions, ChartType } from '@/types/charts';

interface ChartProps {
  options: Partial<ChartOptions>;
  series: number[]
}

const props = defineProps<ChartProps>()
</script>

<template>
  <div>
    <ApexCharts width="100%" type="pie" :options="props.options" :series="props.series"></ApexCharts>
  </div>
</template>
