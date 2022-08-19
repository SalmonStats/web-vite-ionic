<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  onIonViewDidEnter,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonBackdrop,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  onIonViewWillLeave
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import CoopHeader from '@/components/CoopHeader.vue';
import { onMounted, ref, Ref } from 'vue';
import dayjs from 'dayjs';
import { GradeResult, ShiftStats, WeaponResult } from '@/types/salmonstats';

type Tournamnet = {
  title: string,
  event_holder: string,
  web_site: string
  start_time: string,
  end_time: string,
  identifier: string
}

const router = useRoute()
const { t } = useI18n()
const parameters: number[] = [
  0,
  12,
  28,
  37,
  43,
  48,
  52,
  56,
  59,
  61,
  63,
  66,
  68,
  69,
  71,
  73,
  74,
  75,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  86,
  87,
  88,
  89,
  89,
  90,
  91,
  91,
  92,
  93,
  93,
  94,
  94,
  95,
  95,
  96,
  96,
  97,
  97,
  98,
  98,
  99,
  99,
]

// 500m秒ずつ更新する
const currentTime: Ref<number> = ref<number>(dayjs().unix())
setInterval(() => {
  currentTime.value = dayjs().unix()
}, 500)
const results: Ref<WeaponResult[]> = ref<WeaponResult[]>([])
const autoLoad = setInterval(async () => {
  const url = `${import.meta.env.VITE_APP_URL}/stats/1660910400`
  results.value = ((await (await fetch(url)).json()) as ShiftStats).weapon_results
}, 1000 * 60)

onIonViewWillLeave(() => {
  clearInterval(autoLoad)
})

onMounted(async () => {
  const url = `${import.meta.env.VITE_APP_URL}/stats/1660910400`
  results.value = ((await (await fetch(url)).json()) as ShiftStats).weapon_results
})

const tournament: Tournamnet =
{
  title: '第二回アスファルトタイヤ斬りつける大会',
  event_holder: '@tkgling',
  web_site: '',
  start_time: '2022-08-19T21:00:00+09:00',
  end_time: '2022-08-21T15:00:00+09:00',
  identifier: 'wheel_slash'
}

function remindTime(tournament: Tournamnet): string {
  const startTime: number = dayjs(tournament.start_time).unix()
  const remindTime: number = startTime - currentTime.value
  const hours = ("00" + Math.floor(remindTime / 3600)).slice(-2);
  const minutes = ("00" + Math.floor((remindTime % 3600) / 60)).slice(-2);
  const seconds = ("00" + Math.floor(remindTime % 60)).slice(-2);
  return `${hours}:${minutes}:${seconds}`;
}

function estimateCounts(result: WeaponResult): number {
  // まだバイトしていない人は100
  if (result.supplied_weapon_counts === 0) {
    return 100
  }
  return parameters[51 - result.supplied_weapon_counts] + result.shifts_worked
}

function elapsedTime(tournament: Tournamnet): string {
  const endTime: number = dayjs(tournament.end_time).unix()
  const remindTime: number = endTime - currentTime.value
  const hours = ("00" + Math.floor(remindTime / 3600)).slice(-2);
  const minutes = ("00" + Math.floor((remindTime % 3600) / 60)).slice(-2);
  const seconds = ("00" + Math.floor(remindTime % 60)).slice(-2);
  return `${hours}:${minutes}:${seconds}`;
}
</script>

<template>
  <IonPage>
    <IonContent>
      <CoopHeader title="現在開催中の大会" />
      <IonList>
        <IonListHeader mode="ios">
          <IonLabel>
            {{ dayjs(tournament.start_time).unix() <= currentTime ? t("title.labels.holding") :
                t("title.labels.coming_soon")
            }} </IonLabel>
        </IonListHeader>
        <IonItem>
          <div class="coop-result-tournament-wrapper">
            <IonLabel>
              {{ tournament.title }}
            </IonLabel>
            <div id="time">
              <IonLabel>
                {{ dayjs(tournament.start_time).unix() <= currentTime ? t("title.labels.remind_end_time", {
                    time:
                      elapsedTime(tournament)
                  }) : t("title.labels.remind_start_time", { time: remindTime(tournament) })
                }}
                  </IonLabel>
            </div>
          </div>
        </IonItem>
        <IonListHeader mode="ios">{{ t("title.labels.rank") }}</IonListHeader>
        <template v-for="result in results" :key="result.nsaid">
          <IonItem :class="result.supplied_weapon_counts == 51 ? 'coop-result-complete' : 'coop-result-incomplete'"
            v-if="result.shifts_worked !== undefined">
            <div style="display: flex; width: 100%;">
              <section class="coop-result-rank">
                <IonLabel>
                  {{ result.rank }}
                </IonLabel>
              </section>
              <section>
                <IonLabel>
                  {{ result.name }}
                </IonLabel>
              </section>
              <section class="count">
                <IonLabel>
                  {{ t("title.labels.supplied_weapon_counts", { count: result.supplied_weapon_counts }) }}
                </IonLabel>
                <IonLabel>
                  {{ t("title.labels.shifts_worked", { count: result.shifts_worked }) }}
                </IonLabel>
              </section>
            </div>
          </IonItem>
        </template>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style lang="scss" scoped>
#time {
  text-align: right;
}

.coop-result-rank {
  margin-right: 10px;
}

.coop-result-wrapper {
  display: flex;
  width: 100%;
}

.coop-result-tournament-wrapper {
  width: 100%;
}

.count {
  width: 100%;
  text-align: right;
}

ion-item {
  &.coop-result-complete {
    --background: #FFE55C;

    ion-label {
      color: #000;
    }
  }
}
</style>
