<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { Result } from '@/types/splatnet2';
import { useRoute } from 'vue-router';
import CoopHeader from '@/components/CoopHeader.vue';
import CoopSchedule from '@/components/CoopSchedule.vue';
import CoopWave from '@/components/CoopWave.vue';
import CoopPlayer from '@/components/CoopPlayer.vue';
import CoopDefeated from '@/components/CoopDefeated.vue';

const router = useRoute()
const { t } = useI18n()

const result: Ref<Result | undefined> = ref<Result>()

async function onLoad() {
  console.log("Loading Results")
  const { result_id } = router.params
  const url = `${import.meta.env.VITE_APP_URL}/results/${result_id}`
  result.value = (await (await fetch(url)).json())
}

onMounted(async () => {
  await onLoad()
})

// 表示するたびに呼ばれる
// onIonViewDidEnter(async () => {
//   await onLoad()
// })
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.result')" />
    <IonContent v-if="result !== undefined">
      <CoopSchedule :schedule="result.schedule" />
      <CoopWave :result="result" />
      <CoopPlayer :players="result.players" />
      <CoopDefeated :result="result" />
    </IonContent>
  </IonPage>
</template>
