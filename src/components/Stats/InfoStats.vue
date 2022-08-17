<script setup lang="ts">
import { BossResult, GradeResult, WaveResult } from '@/types/salmonstats';
import { JobResult } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList, IonAvatar, IonImg, IonSkeletonText } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { bossURL } from '@/functions';
import IonLoadingContent from '../Extensions/IonLoadingContent.vue';
import JobResultItem from './Items/JobResultItem.vue';
import BossResultItem from './Items/BossResultItem.vue';

const { t } = useI18n()
const props = defineProps<{
  result?: JobResult
  bosses?: BossResult[]
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
    <JobResultItem :result=result />
    <IonListHeader mode="ios">
      <IonLabel>
        {{ t(`title.headers.salmon_ids`) }}
      </IonLabel>
    </IonListHeader>
    <BossResultItem :results=bosses />
  </IonList>
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
