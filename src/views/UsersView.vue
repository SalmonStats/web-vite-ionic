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
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import CoopButton from '@/components/CoopButton.vue';
import { SplatNet2 } from '@/types/common';
import { Player } from '@/types/salmonstats';
import { onMounted, Ref, ref } from 'vue';
import CoopUser from '../components/CoopUser.vue';
import CoopRecord from '@/components/CoopRecord.vue';
import { useRoute } from 'vue-router';

const router = useRoute()

const { t } = useI18n()
const player: Ref<Player | undefined> = ref<Player>()
const account: Ref<SplatNet2 | undefined> = ref<SplatNet2>()

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
    <CoopHeader :title="player?.nickname ?? t('title.headers.users')" />
    <IonContent>
      <template v-if="player !== undefined">
        <CoopUser :player="player" />
        <CoopRecord :results="player.stage_results" />
      </template>
      <template v-if="account !== undefined">
        <CoopButton :account="account" />
      </template>
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
