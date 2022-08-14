<script setup lang="ts">
import { onMounted, PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
  ChartOptions,
} from 'chart.js'
import { onIonViewDidEnter } from '@ionic/vue';
import { ChartData, ChartProps as Props } from '@/types/charts';

interface ChartProps extends Props {
  data: ChartData
}

const props = defineProps<ChartProps>()

const options: ChartOptions = {
  responsive: false,
  maintainAspectRatio: false
}

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

onIonViewDidEnter(() => {
})
onMounted(() => {
})
</script>

<template>
  <div id="canvas-wrapper">
    <Pie :chart-data="props.data" :width=340 :height=340 :chart-options="options" />
  </div>
</template>

<style lang="scss" scoped>
#canvas-wrapper {
  width: 300px;
  margin: 0 auto;
}
</style>
