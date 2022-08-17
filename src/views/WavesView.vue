<script setup lang="ts">
import {
  IonContent,
  IonPage,
  onIonViewDidEnter,
  IonToolbar,
  IonSegment,
  IonSegmentButton
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import axios from 'axios';
import { ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { ResultDetail } from '@/types/salmonstats';
import WaveResult from '@/components/Stats/WaveResult.vue';
import WaveSegment from '@/components/Stats/WaveSegment.vue';
import IonLoadingContent from '@/components/Extensions/IonLoadingContent.vue';

const { t } = useI18n()
const router = useRoute()
const waveId: Ref<number> = ref<number>(0)
const stacks: Ref<ResultDetail[]> = ref<ResultDetail[]>([])
const results: Ref<ResultDetail[]> = ref<ResultDetail[]>([])

const { event_type, water_level, nightless } = router.query
const { start_time } = router.params
const title: string = (() => {
  if (nightless === undefined) {
    return t(`wave_result.water_level.${water_level}`) + " " + t(`wave_result.event_type.${event_type}`)
  }
  return t(`results.${nightless === 'true' ? 'nightless' : 'night'}`)
})()

async function onLoad(offset: number = 0) {
  // パラメーターから検索条件を作成
  const url: string = (() => {
    const baseURL: string = `${import.meta.env.VITE_APP_URL}`
    // WAVE記録
    if (nightless !== undefined && nightless !== null) {
      const params: URLSearchParams = new URLSearchParams({
        nightless: nightless.toString()
      })
      return `${baseURL}/totals/${start_time}?${params.toString()}`

    }
    // 総合記録
    const params: URLSearchParams = new URLSearchParams({
      event_type: event_type as string,
      water_level: water_level as string,
    })
    return `${baseURL}/waves/${start_time}?${params.toString()}`
  })()

  stacks.value = (await axios.get(url)).data
  stacks.value.forEach((result: ResultDetail, index) => {
    setTimeout(() => {
      results.value.push(result)
    }, 50 * index)
  })
}

function segmentChanged(value: number) {
  waveId.value = Number(value)
  // 一度空っぽにする
  results.value = []
  stacks.value.filter((result: ResultDetail) => result.wave_id + 1 === waveId.value || waveId.value === 0).forEach((result: ResultDetail, index) => {
    setTimeout(() => {
      results.value.push(result)
    }, 50 * index)
  })
}

onIonViewDidEnter(async () => {
  await onLoad()
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="title" />
    <IonContent>
      <template v-if="[0, 5, 6].includes(Number(event_type))">
        <WaveSegment :waveId="waveId" @segmentChanged="segmentChanged" />
      </template>
      <IonLoadingContent :visible="results.length !== 0">
        <TransitionGroup name="results" tag="ion-list">
          <template v-for="result in results" :key="result.members">
            <WaveResult :result="result" :rank="waveId === 0 ? result.rank : (result.wave_rank ?? 0)"
              v-if="result.wave_id + 1 === waveId || waveId === 0" />
          </template>
        </TransitionGroup>
      </IonLoadingContent>
    </IonContent>
  </IonPage>
</template>

<style lang="scss" scoped>
.results-enter-active,
.results-leave-active {
  transition: all 0.5s ease-in;
}

.results-enter-from,
.results-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
</style>
