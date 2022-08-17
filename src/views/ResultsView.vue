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
import { onMounted, watchEffect } from 'vue';
import { ref, Ref } from 'vue';
import { Result } from '@/types/splatnet2';
import CoopResultOverview from '@/components/CoopResultOverview.vue';
import { Paginated, Parameters } from '@/types/common';
import { OrderType, SortType } from '@/types/enum';
import ModalButton from '../components/ModalButton.vue';
import IonLoadingContent from '@/components/Extensions/IonLoadingContent.vue';

interface Props {
  nsaid?: string;
  limit?: number;
  sort?: SortType;
  order?: OrderType;
  nightless?: boolean;
  golden_ikura_num?: number;
  ikura_num?: number;
  is_clear?: boolean;
}

const { t } = useI18n()
const isLoading: Ref<boolean> = ref<boolean>(false)
const results: Ref<Result[]> = ref<Result[]>([])

const props = withDefaults(defineProps<Props>(), {
  nsaid: undefined,
  limit: isPlatform('desktop') ? 20 : 10,
  sort: SortType.CREATED,
  order: OrderType.DESC,
  nightless: false,
  golden_ikura_num: 0,
  ikura_num: 0,
  is_clear: false
})

// 受け取ったデータからModalButtonに渡すデータを作成
const parameters: Ref<Parameters> = ref<Parameters>(props)

async function onLoad(offset: number = 0) {
  // パラメーターから検索条件を作成
  const params: URLSearchParams = new URLSearchParams({
    limit: parameters.value.limit.toString(),
    offset: results.value.length.toString(),
    sort: parameters.value.sort.toString(),
    order: parameters.value.order.toString(),
    ikura_num: parameters.value.ikura_num.toString(),
    golden_ikura_num: parameters.value.golden_ikura_num.toString(),
  })

  // 追加のパラメータの設定
  if (props.nsaid !== undefined) {
    params.append('nsaid', props.nsaid)
  }
  if (parameters.value.nightless === true) {
    params.append('night_less', 'true')
  }

  console.log(params.toString())
  const url: string = `${import.meta.env.VITE_APP_URL}/results?${params.toString()}`
  const response: Paginated<Result> = (await axios.get(url)).data
  response.results.forEach((result: Result, index) => {
    setTimeout(() => {
      results.value.push(result)
    }, index * 100)
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
  console.log("Set New Parameters")
  results.value = []
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
      <IonLoadingContent :visible="results.length !== 0">
        <IonRefresher @ion-refresh="onRefresh($event)" slot="fixed">
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <TransitionGroup appear name="results" tag="ion-list">
          <template v-for="result in results" :key="result.salmon_id">
            <CoopResultOverview :result="result" />
          </template>
        </TransitionGroup>
        <IonInfiniteScroll @ion-infinite="getResults">
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonLoadingContent>
      <ModalButton :parameters="parameters" @parameters="setParams" />
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

.results-enter-active,
.results-leave-active {
  transition: all 1s ease;
}

.results-enter-from,
.results-leave-to {
  opacity: 0;
  transform: translateX(30%);
}
</style>
