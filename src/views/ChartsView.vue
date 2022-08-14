<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  onIonViewDidEnter,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import PieChart from '@/components/Charts/PieChart.vue';
import { onMounted, ref, Ref } from 'vue';
import { TChartData } from 'vue-chartjs/dist/types';
import { ShiftStats } from '@/types/salmonstats';
import { ChartData } from '@/types/charts';

const { t } = useI18n()

// const data: TChartData<'pie'> = {
//   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
//   datasets: [
//     {
//       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//       data: [40, 20, 80, 10]
//     }
//   ]
// }

async function onLoad() {
  const url = `${import.meta.env.VITE_APP_URL}/stats/1655575200`
  const response: ShiftStats = await (await fetch(url)).json() as ShiftStats
  data.value.datasets = [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: response.boss_results.map((result) => result.boss_counts)
    },
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: response.boss_results.map((result) => result.boss_kill_counts)
    },
  ]
}

const data: Ref<ChartData> = ref<ChartData>({
  labels: [... new Array(9)].map((_, id) => t(`salmonIds.${id}`)),
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [0, 0, 0, 0]
    }
  ]
})

onIonViewDidEnter(async () => {
  await onLoad()
})

onMounted(async () => {
  await onLoad()
})

</script>

<template>
  <IonPage>
    <IonContent>
      <PieChart :data="data" />
    </IonContent>
  </IonPage>
</template>

<style lang="scss" scoped>
</style>
