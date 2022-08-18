<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonToolbar,
  onIonViewDidEnter,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonBackdrop
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { informationCircleOutline, calendarOutline, layersOutline, pieChartOutline } from 'ionicons/icons';
import CoopHeader from '@/components/CoopHeader.vue';
import CoopButton from '@/components/CoopButton.vue';
import { SplatNet2 } from '@/types/common';
import { Player } from '@/types/salmonstats';
import { onMounted, Ref, ref } from 'vue';
import CoopRecord from '@/components/CoopRecord.vue';
import { useRoute } from 'vue-router';
import ResultsView from './ResultsView.vue';
import SignInAlert from '@/components/SignInAlert.vue';
import UnderConstruction from '@/components/UnderConstruction.vue';

enum UserType {
  SELF,
  OTHER
}
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

// ログインしているユーザーのタイプを表示する
const type: UserType = (() => {
  if (router.params.nsaid === undefined) {
    return UserType.SELF
  }
  return UserType.OTHER
})()

// ログイン状態のチェックに使える
const nsaid: string | undefined = (() => {
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
    const url: string = `${import.meta.env.VITE_APP_URL}/players/${nsaid}`
    player.value = await (await fetch(url)).json() as Player
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
    <CoopButton :account="account" @updated="(value) => account = value"
      v-if="type === UserType.SELF && account.iksm_session !== undefined && account.iksm_session.length !== 0" />
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
      <SignInAlert v-if="nsaid === undefined" />
      <CoopRecord :results="player?.stage_results" v-if="selected === SegmentType.INFO" />
      <ResultsView :nsaid="nsaid" v-show="selected === SegmentType.RESULTS" />
      <UnderConstruction v-if="selected === SegmentType.SCHEDULES" />
      <UnderConstruction v-if="selected === SegmentType.CHARTS" />
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
