<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonIcon,
  IonSegmentButton,
  IonSegment
} from '@ionic/vue';
import { informationCircleOutline, eggOutline, ribbonOutline, statsChartOutline } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import { onMounted, ref, Ref } from 'vue';
import { ShiftStats } from '@/types/salmonstats';
import EggStats from '@/components/Stats/EggStats.vue';
import { useRoute } from 'vue-router';
import GradeStats from '@/components/Stats/GradeStats.vue';

const { t } = useI18n()

const router = useRoute()
const results: Ref<ShiftStats | undefined> = ref<ShiftStats>()

async function onLoad() {
  const { start_time } = router.params
  const url = `${import.meta.env.VITE_APP_URL}/stats/${start_time as string}`
  const response: ShiftStats = await (await fetch(url)).json()
  results.value = response
}

onMounted(async () => {
  await onLoad()
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.schedules')" />
    <IonContent>
      <IonToolbar>
        <IonSegment>
          <IonSegmentButton>
            <IonIcon :src="informationCircleOutline"></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton>
            <IonIcon :src="ribbonOutline"></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton>
            <IonIcon :src="statsChartOutline"></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton>
            <IonIcon :src="eggOutline"></IonIcon>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
      <template v-if="results !== undefined">
        <!-- <EggStats :results=results.wave_results /> -->
        <GradeStats :results=results.grade_results />
      </template>
    </IonContent>
  </IonPage>
</template>
