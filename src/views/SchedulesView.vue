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
import CoopSchedule from '@/components/CoopSchedule.vue';
import { Schedule } from '@/types/splatnet2';
import { onMounted, Ref, ref } from 'vue';
import { Paginated } from '@/types/common';

const { t } = useI18n()
const schedules: Ref<Schedule[]> = ref<Schedule[]>([])

async function onLoad() {
  console.log("Loading Schedules")
  const url = `${import.meta.env.VITE_APP_URL}/schedules`
  schedules.value = (await (await fetch(url)).json()).results
}

onMounted(async () => {
  await onLoad()
})

// 表示されるたびに呼ばれる
// onIonViewDidEnter(async () => {
//   await onLoad()
// })
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.schedules')" />
    <IonContent>
      <IonList>
        <template v-for="schedule in schedules" :key="schedule.start_time">
          <CoopSchedule :schedule="schedule" />
        </template>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
