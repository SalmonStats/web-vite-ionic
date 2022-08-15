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

enum SegmentType {
  INFO = 'info',
  GRADE = 'grade',
  CHART = 'chart',
  EGG = 'egg'
}

type Segment = {
  value: SegmentType,
  icon: string,
  label?: string
}
const router = useRoute()
const { t } = useI18n()
const player: Ref<Player | undefined> = ref<Player>()
const account: Ref<SplatNet2 | undefined> = ref<SplatNet2>()
const selected: Ref<SegmentType> = ref<SegmentType>(SegmentType.INFO)

const segments: Segment[] = [
  {
    value: SegmentType.INFO,
    icon: informationCircleOutline,
  },
  {
    value: SegmentType.CHART,
    icon: layersOutline
  },
  {
    value: SegmentType.GRADE,
    icon: calendarOutline
  },
  {
    value: SegmentType.EGG,
    icon: pieChartOutline
  },
]

function onLoad() {
  // パスパラメータがなければストレージからアカウント情報を読み込む
  if (router.params.nsaid === undefined) {
    const data: string | null = localStorage.getItem('account')
    if (data !== null) {
      account.value = JSON.parse(data) as SplatNet2
    }
  }

  // 取得するユーザーを指定する
  const nsaid: string | undefined = (router.params.nsaid as string) ?? account.value?.nsaid

  // 取得するユーザーがなければ何もしない
  if (nsaid === undefined) {
    return
  }

  const url = `${import.meta.env.VITE_APP_URL}/players/${nsaid}`
  fetch(url)
    .then((res) => res.json())
    .then((res: Player) => {
      player.value = res
      console.log(res)
    })
}

onMounted(() => {
  onLoad()
})

onIonViewDidEnter(() => {
  onLoad()
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.account')" />
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
      <ResultsView />
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
