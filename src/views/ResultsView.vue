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
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref, Ref } from 'vue';
import { Result } from '@/types/splatnet2';
import CoopResultOverview from '@/components/CoopResultOverview.vue';
import { Paginated, Parameters } from '@/types/common';
import { SortType } from '@/types/enum';

const { t } = useI18n()
const results: Ref<Result[]> = ref<Result[]>([])

// const emit = defineEmits<Parameters>()
const sortType: Ref<SortType> = ref<SortType>(SortType.CREATED)

async function onLoad(offset: number = 0) {
  // タブレットやPCの場合は50件取得、その他は15件取得
  const limit: number = (isPlatform('desktop') || isPlatform('phablet')) ? 50 : 15
  console.log(`Loading Results: Offset: ${offset} Limit: ${limit}`)
  const url: string = `${import.meta.env.VITE_APP_URL}/results?limit=${limit}&offset=${offset}&sort=${sortType.value}&order=desc`
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

async function changeOrder(event: CustomEvent) {
  sortType.value = Object.values(SortType)[Object.values(SortType).indexOf(event.detail.value)] as SortType
  results.value = []
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
