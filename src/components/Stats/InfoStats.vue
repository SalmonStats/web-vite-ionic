<script setup lang="ts">
import { BossResult, GradeResult, WaveResult } from '@/types/salmonstats';
import { JobResult } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList, IonAvatar, IonImg } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

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
      {{ t(`ranks.grade`) }}
    </IonLabel>
  </IonListHeader>
  <template v-for="(boss, index) in bosses">
    <IonItem>
      <div>
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
  &.coop-result-key {
    width: 120px;
    text-align: left;
  }

  &.coop-result-column {
    width: calc(100% - 120px - 60px);
    text-align: right;
  }

  &.coop-result-values {
    width: 60px;
  }


  text-align: right;
}
</style>
