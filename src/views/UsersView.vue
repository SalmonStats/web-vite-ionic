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
  IonSegment,
  IonSegmentButton,
  IonIcon
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { informationCircleOutline, calendarOutline, layersOutline, pieChartOutline } from 'ionicons/icons';
import CoopHeader from '@/components/CoopHeader.vue';
import CoopButton from '@/components/CoopButton.vue';
import { SplatNet2 } from '@/types/common';
import { Player } from '@/types/salmonstats';
import { onMounted, Ref, ref } from 'vue';
import CoopUser from '@/components/CoopUser.vue';
import CoopRecord from '@/components/CoopRecord.vue';
import { useRoute } from 'vue-router';
import NowLoading from '@/components/NowLoading.vue';
import ResultsView from './ResultsView.vue';
import SignInAlert from '@/components/SignInAlert.vue';

enum SegmentType {
  INFO = 'info',
  RESULTS = 'results',
  SCHEDULES = 'schedules',
  CHARTS = 'charts'
}

type Segment = {
  value: SegmentType,
  icon: string,
  label?: string
}
const router = useRoute()
const { t } = useI18n()

const account: Ref<SplatNet2> = ref<SplatNet2>((() => {
  return JSON.parse(localStorage.getItem('account') ?? "{}") as SplatNet2
})())

const nsaid: string = (() => {
  // パラメータからIDを取得する
  // なければログイン情報から取得する
  return router.params.nsaid as string ?? account.value.nsaid
})()

const player: Ref<Player | undefined> = ref<Player>()

const selected: Ref<SegmentType> = ref<SegmentType>(SegmentType.INFO)

const segments: Segment[] = [
  {
    value: SegmentType.INFO,
    icon: informationCircleOutline,
  },
  {
    value: SegmentType.RESULTS,
    icon: layersOutline
  },
  {
    value: SegmentType.SCHEDULES,
    icon: calendarOutline
  },
  {
    value: SegmentType.CHARTS,
    icon: pieChartOutline
  },
]

async function onLoad() {
  if (nsaid === undefined) {
    return
  }
  try {
    console.log(nsaid)
    const url: string = `${import.meta.env.VITE_APP_URL}/players/${nsaid}`
    player.value = await (await fetch(url)).json() as Player
    console.log(player.value)
  } catch (error) {
    console.log(error)
  }
}

// 表示される度に実行される
onIonViewDidEnter(async () => {
  await onLoad()
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="player?.nickname ?? t('title.headers.loading')" />
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
      <template v-if="player !== undefined">
        <ResultsView :nsaid="nsaid" v-if="selected === SegmentType.RESULTS" />
      </template>
      <template v-if="player === undefined && account.nsaid === undefined">
        <SignInAlert />
      </template>
      <template v-if="player === undefined && account.nsaid !== undefined">
        <NowLoading />
      </template>
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
