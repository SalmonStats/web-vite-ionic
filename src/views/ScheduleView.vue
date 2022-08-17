<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonIcon,
  IonSegmentButton,
  IonSegment,

} from '@ionic/vue';
import { informationCircleOutline, eggOutline, ribbonOutline, statsChartOutline } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import { onMounted, ref, Ref } from 'vue';
import { ShiftStats } from '@/types/salmonstats';
import EggStats from '@/components/Stats/EggStats.vue';
import { useRoute } from 'vue-router';
import GradeStats from '@/components/Stats/GradeStats.vue';
import InfoStats from '../components/Stats/InfoStats.vue';
import NowLoading from '@/components/NowLoading.vue';
import UnderConstruction from '@/components/UnderConstruction.vue';

const { t } = useI18n()

const router = useRoute()
const results: Ref<ShiftStats | undefined> = ref<ShiftStats>()

async function onLoad() {
  const { start_time } = router.params
  const url = `${import.meta.env.VITE_APP_URL}/stats/${start_time as string}`
  const response: ShiftStats = await (await fetch(url)).json()
  results.value = response
}

enum SegmentType {
  INFO = 'info',
  GRADE = 'grade',
  CHART = 'chart',
  EGG = 'egg'
}

const selected: Ref<SegmentType> = ref<SegmentType>(SegmentType.INFO)

type Segment = {
  value: SegmentType,
  icon: string,
  label?: string
}

const segments: Segment[] = [
  {
    value: SegmentType.INFO,
    icon: informationCircleOutline,
  },
  {
    value: SegmentType.GRADE,
    icon: ribbonOutline,
  },
  {
    value: SegmentType.CHART,
    icon: statsChartOutline,
  },
  {
    value: SegmentType.EGG,
    icon: eggOutline,
  }
]

onMounted(async () => {
  await onLoad()
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.schedules')" />
    <IonContent>
      <IonToolbar>
        <IonSegment :value="selected" @ionChange="(value: CustomEvent) => selected = value.detail.value">
          <template v-for="segment in segments">
            <IonSegmentButton :value="segment.value">
              <IonIcon :src="segment.icon"></IonIcon>
            </IonSegmentButton>
          </template>
        </IonSegment>
      </IonToolbar>
      <template v-if="results !== undefined">
        <InfoStats :result=results.job_results :bosses="results.boss_results" v-if="selected === SegmentType.INFO" />
        <GradeStats :results=results.grade_results v-if="selected === SegmentType.GRADE" />
        <EggStats :results=results.wave_results :totals="results.total_results" v-if="selected === SegmentType.EGG" />
        <UnderConstruction v-if="selected === SegmentType.CHART" />
      </template>
    </IonContent>
  </IonPage>
</template>
