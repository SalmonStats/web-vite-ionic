<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  isPlatform,
  IonToolbar,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton
} from '@ionic/vue';
import { filterOutline } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref, Ref } from 'vue';
import { Result } from '@/types/splatnet2';
import CoopResultOverview from '@/components/CoopResultOverview.vue';
import { Paginated, Parameters } from '@/types/common';
import { OrderType, SortType } from '@/types/enum';
import ModalButton from '../components/ModalButton.vue';

const { t } = useI18n()
const results: Ref<Result[]> = ref<Result[]>([])

const parameters: Ref<Parameters> = ref<Parameters>({
  // 受け取ったデータで初期化する
  limit: 15,
  sort: SortType.CREATED,
  order: OrderType.DESC,
  nightless: false,
  golden_ikura_num: 100,
  ikura_num: 1000,
  is_clear: true
})

async function onLoad(offset: number = 0) {
  if (offset === 0) {
    results.value = []
  }
  // タブレットやPCの場合は50件取得、その他は15件取得
  const sortType: SortType = parameters.value.sort
  const limit: number = (isPlatform('desktop') || isPlatform('phablet')) ? 50 : parameters.value.limit
  const orderType: OrderType = parameters.value.order
  const nightless: boolean = parameters.value.nightless
  const golden_ikura_num: number = parameters.value.golden_ikura_num
  const ikura_num: number = parameters.value.ikura_num
  console.log(`Loading Results: Offset: ${offset} Limit: ${limit}`)
  const params: URLSearchParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    sort: sortType.toString(),
    order: orderType.toString(),
    ikura_num: ikura_num.toString(),
    golden_ikura_num: golden_ikura_num.toString(),
  })
  if (nightless) {
    params.append('night_less', 'true')
  }
  console.log(params.toString())
  const url: string = `${import.meta.env.VITE_APP_URL}/results?${params.toString()}`
  const response: Paginated<Result> = (await axios.get(url)).data
  response.results.forEach((result: Result) => {
    results.value.push(result)
  })
}

async function onRefresh(event: CustomEvent) {
  console.log("Refreshing Results")
  setTimeout(async () => {
    await onLoad()
    event.detail.complete()
  }, 1000)
}

function getResults(event: InfiniteScrollCustomEvent) {
  console.log("Loading Additional Results")
  setTimeout(async () => {
    await onLoad(results.value.length)
    event.target.complete()
  }, 1000)
}

// 返ってきたパラメータを上書きする
async function setParams(value: Parameters) {
  parameters.value = value
  await onLoad()
}

onMounted(async () => {
  await onLoad()
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.results')" />
    <IonContent>
      <ModalButton :parameters="parameters" @parameters="setParams" />
      <IonRefresher @ion-refresh="onRefresh($event)" slot="fixed">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonList>
        <template v-for="result in results" :key="result.salmon_id">
          <CoopResultOverview :result="result" />
        </template>
      </IonList>
      <IonInfiniteScroll @ion-infinite="getResults">
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  </IonPage>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  width: 100%;
  // max-width: 800px;
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
