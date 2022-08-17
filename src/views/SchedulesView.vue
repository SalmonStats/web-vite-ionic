<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonList,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import CoopSchedule from '@/components/CoopSchedule.vue';
import { Schedule } from '@/types/splatnet2';
import { onMounted, Ref, ref } from 'vue';
import IonLoadingContent from '@/components/Extensions/IonLoadingContent.vue';

const { t } = useI18n()
const schedules: Ref<Schedule[]> = ref<Schedule[]>([])

async function onLoad() {
  console.log("Loading Schedules")
  const url: string = `${import.meta.env.VITE_APP_URL}/schedules`
  const response: Schedule[] = (await (await fetch(url)).json()).results
  response.forEach((schedule: Schedule, index) => {
    setTimeout(() => {
      schedules.value.push(schedule)
    }, index * 100)
  })
}

onMounted(async () => {
  await onLoad()
})
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.schedules')" />
    <IonContent>
      <IonLoadingContent :visible="schedules.length !== 0">
        <TransitionGroup name="schedules" tag="ion-list">
          <template v-for="schedule in schedules" :key="schedule.start_time">
            <CoopSchedule :schedule="schedule" />
          </template>
        </TransitionGroup>
      </IonLoadingContent>
    </IonContent>
  </IonPage>
</template>

<style lang="scss" scoped>
.schedules-enter-active,
.schedules-leave-active {
  transition: all 1s ease;
}

.schedules-enter-from,
.schedules-leave-to {
  opacity: 0;
  transform: translateX(30%);
}
</style>
