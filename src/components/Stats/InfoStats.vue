<script setup lang="ts">
import { BossResult, GradeResult, WaveResult } from '@/types/salmonstats';
import { JobResult } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList, IonAvatar, IonImg } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { bossURL } from '@/functions';

const { t } = useI18n()
const props = defineProps<{
  result: JobResult
  bosses: BossResult[]
}>()

Array.prototype.sum = function () {
  const items = this as number[];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, num) => sum + num, 0);
};
</script>

<template>
  <IonList>
    <IonListHeader mode="ios">
      <IonLabel>
        {{ t("job_result.job") }}
      </IonLabel>
    </IonListHeader>
    <IonItem>
      <div>
        <section class="coop-result-key">
          <IonLabel>{{ t("title.labels.shifts_worked") }}</IonLabel>
          <IonLabel class="prob">{{ (result.is_clear / (result.is_failure + result.is_clear) * 100).toFixed(3) }}
          </IonLabel>
        </section>
        <section class="coop-result-values">
          <IonLabel class="num">{{ result.is_clear + result.is_failure }}</IonLabel>
          <!-- <IonLabel class="num">{{ wave.time_limit }}</IonLabel> -->
        </section>
      </div>
    </IonItem>
    <template v-for="(wave, index) in result.failure_waves">
      <IonItem>
        <div>
          <section class="coop-result-key">
            <IonLabel>WAVE {{ index + 1 }}</IonLabel>
          </section>
          <section class="coop-result-column">
            <IonLabel>{{ t("job_result.wipe_out") }}</IonLabel>
            <IonLabel>{{ t("job_result.time_limit") }}</IonLabel>
          </section>
          <section class="coop-result-values">
            <IonLabel class="num">{{ wave.wipe_out }}</IonLabel>
            <IonLabel class="num">{{ wave.time_limit }}</IonLabel>
          </section>
        </div>
      </IonItem>
    </template>
  </IonList>
  <IonListHeader mode="ios">
    <IonLabel>
      {{ t(`title.headers.salmon_ids`) }}
    </IonLabel>
  </IonListHeader>
  <template v-for="(boss, index) in bosses">
    <IonItem>
      <div>
        <section class="coop-result-img">
          <IonImg :src="bossURL(index)" style="width: 40px; height: 40px; aspect-ratio: 1;"></IonImg>
        </section>
        <section class="coop-result-key">
          <IonLabel>{{ t(`salmonIds.${index}`) }}</IonLabel>
          <IonLabel class="prob">{{ (boss.boss_kill_counts / boss.boss_counts * 100).toFixed(3) }}</IonLabel>
        </section>
        <section class="coop-result-column">
          <IonLabel>{{ t("salmonIds.results.defeated") }}</IonLabel>
          <IonLabel>{{ t("salmonIds.results.appearances") }}</IonLabel>
        </section>
        <section class="coop-result-values">
          <IonLabel class="num">{{ boss.boss_kill_counts }}</IonLabel>
          <IonLabel class="num">{{ boss.boss_counts }}</IonLabel>
        </section>
      </div>
    </IonItem>
  </template>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
}

section {
  &.coop-result-img {
    width: 50px;
  }

  &.coop-result-key {
    width: 120px;
    text-align: left;
  }

  &.coop-result-column {
    width: calc(100% - 120px - 60px - 50px);
    text-align: right;
  }

  &.coop-result-values {
    width: 60px;
  }

  text-align: right;
}
</style>
