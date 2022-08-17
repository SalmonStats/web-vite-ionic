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

const { t } = useI18n()
const router = useRoute()
const waveId: Ref<number> = ref<number>(0)
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
  console.log(event_type, water_level, nightless)

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

  const response: ResultDetail[] = (await axios.get(url)).data
  response.forEach((result: ResultDetail) => {
    results.value.push(result)
  })
}

onIonViewDidEnter(async () => {
  if (results.value.length === 0) {
    await onLoad()
  }
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="title" />
    <IonContent>
      <template v-if="[0, 5, 6].includes(Number(event_type))">
        <WaveSegment :waveId="waveId" @segmentChanged="(value) => waveId = Number(value)" />
      </template>
      <template v-for="result in results">
        <WaveResult :result="result" :rank="waveId === 0 ? result.rank : (result.wave_rank ?? 0)"
          v-show="(waveId === 0 || result.wave_id === waveId - 1)" />
      </template>
    </IonContent>
  </IonPage>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
}

ion-select {
  width: 100% !important;
}

section {
  width: 100% !important;
}
</style>
