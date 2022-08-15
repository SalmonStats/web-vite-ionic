<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import PieChart from '@/components/Charts/PieChart.vue';
import { ChartOptions, ChartType } from '@/types/charts';
import BarChart from '@/components/Charts/BarChart.vue';

const { t } = useI18n()

const options: Partial<ChartOptions> = {
  labels: ['aaa'],
}

const series: number[] = [
  30, 40, 45, 50, 49, 60, 70, 91
]
</script>

<template>
  <IonPage>
    <IonContent>
      <BarChart :options="options" :series="series" />
      <PieChart :options="options" :series="series" />
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
