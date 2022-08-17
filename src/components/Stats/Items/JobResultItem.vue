<script setup lang="ts">
import { BossResult, GradeResult, WaveResult } from '@/types/salmonstats';
import { JobResult } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList, IonAvatar, IonImg, IonSkeletonText } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { bossURL } from '@/functions';
import IonLoadingContent from '../Extensions/IonLoadingContent.vue';
const { t } = useI18n()
const props = defineProps<{
  result?: JobResult
}>()
</script>

<template>
  <template v-if="result !== undefined">
    <IonItem>
      <div>
        <section class="coop-result-key">
          <IonLabel>{{ t("title.labels.shifts_worked") }}</IonLabel>
          <IonLabel class="prob">{{ (result.is_clear / (result.is_failure + result.is_clear) * 100).toFixed(3)
          }}
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
  </template>
  <template v-if="result === undefined">
    <IonItem>
      <div>
        <section class="coop-result-key">
          <IonLabel>{{ t("title.labels.shifts_worked") }}</IonLabel>
          <IonLabel>
            <IonSkeletonText></IonSkeletonText>
          </IonLabel>
        </section>
        <section class="coop-result-values">
          <IonLabel>
            <IonSkeletonText></IonSkeletonText>
          </IonLabel>
        </section>
      </div>
    </IonItem>
    <template v-for="(wave, index) in [0, 1, 2]">
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
            <IonLabel>
              <IonSkeletonText></IonSkeletonText>
            </IonLabel>
            <IonLabel>
              <IonSkeletonText></IonSkeletonText>
            </IonLabel>
          </section>
        </div>
      </IonItem>
    </template>
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
