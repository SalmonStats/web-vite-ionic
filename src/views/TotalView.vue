<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonList,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  InfiniteScrollCustomEvent,
  onIonViewDidEnter
} from '@ionic/vue';
import { filterOutline } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import axios from 'axios';
import { ref, Ref } from 'vue';
import NowLoading from '@/components/NowLoading.vue';
import { useRoute } from 'vue-router';
import { ResultDetail } from '@/types/salmonstats';
import WaveResult from '../components/Stats/WaveResult.vue';

const { t } = useI18n()
const router = useRoute()
const results: Ref<ResultDetail[]> = ref<ResultDetail[]>([])

const { nightless } = router.params
const { start_time } = router.params

async function onLoad(offset: number = 0) {
  // パラメーターから検索条件を作成
  const params: URLSearchParams = new URLSearchParams({
    night_less: nightless.toString()
  })

  const url: string = `${import.meta.env.VITE_APP_URL}/waves/${start_time}?${params.toString()}`

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
    <CoopHeader title="" />
    <IonContent>
      <template v-for="result in results">
        <WaveResult :result="result" :event_type="Number(event_type?.valueOf())" />
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
