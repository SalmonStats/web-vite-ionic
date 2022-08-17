<script setup lang="ts">
import { BossResult, GradeResult, WaveResult } from '@/types/salmonstats';
import { JobResult } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList, IonAvatar, IonImg, IonSkeletonText } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { bossURL } from '@/functions';
import IonLoadingContent from '../Extensions/IonLoadingContent.vue';
const { t } = useI18n()
const props = defineProps<{
  results?: BossResult[]
}>()
</script>

<template>
  <template v-if="results !== undefined" v-for="(boss, index) in results">
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
  <template v-if="results === undefined" v-for="(boss, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
    <IonItem>
      <div>
        <section class="coop-result-img">
          <IonImg :src="bossURL(index)" style="width: 40px; height: 40px; aspect-ratio: 1;"></IonImg>
        </section>
        <section class="coop-result-key">
          <IonLabel>{{ t(`salmonIds.${index}`) }}</IonLabel>
          <IonLabel>
            <IonSkeletonText></IonSkeletonText>
          </IonLabel>
        </section>
        <section class="coop-result-column">
          <IonLabel>{{ t("salmonIds.results.defeated") }}</IonLabel>
          <IonLabel>{{ t("salmonIds.results.appearances") }}</IonLabel>
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
