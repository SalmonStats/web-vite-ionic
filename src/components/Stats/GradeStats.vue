<script setup lang="ts">
import { GradeResult, WaveResult } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList, IonAvatar, IonImg } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const props = defineProps<{
  results: GradeResult[]
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
        {{ t(`ranks.grade`) }}
      </IonLabel>
    </IonListHeader>
    <template v-for="result in results">
      <IonItem button :class="`coop-rank-${result.rank}`">
        <div class=" coop-grade-result">
          <section class="coop-grade-result-player">
            <IonLabel style="width: 24px; text-align: center;">{{ result.rank }}</IonLabel>
            <IonAvatar>
              <IonImg :src="result.thumbnail_url"></IonImg>
            </IonAvatar>
          </section>
          <section class="coop-grade-result-player-name">
            <IonLabel class="nsaid">{{ result.nsaid }}</IonLabel>
            <IonLabel>{{ result.name }}</IonLabel>
          </section>
          <section class="coop-grade-result-count">
            <IonLabel>{{ result.grade_point_max }}</IonLabel>
            <IonLabel class="num">{{ result.shifts_worked }}</IonLabel>
          </section>
        </div>
      </IonItem>
    </template>
  </IonList>
</template>

<style lang="scss" scoped>
.coop-wave-appearances {
  text-align: right;
}

ion-item {
  &.coop-rank-1 {
    --background: rgb(240, 230, 140) !important;
    --border-color: black !important;
    --border-width: 0px;
    --padding-top: 4px;
    // --padding-bottom: 4px;
    color: black
  }

  &.coop-rank-2 {
    --background: rgb(212, 212, 212) !important;
    --border-color: black !important;
    --border-width: 0px;
    --padding-top: 4px;
    // --padding-bottom: 4px;
    color: black
  }

  &.coop-rank-3 {
    --background: rgb(245, 167, 90) !important;
    --border-color: black !important;
    --border-width: 0px;
    --padding-top: 4px;
    // --padding-bottom: 4px;
    color: black
  }
}

ion-avatar {
  width: 45px;
  height: 45px;
  margin: 10px 14px;
}

section {
  &.coop-grade-result-player {
    display: flex;
  }

  &.coop-grade-result-player-name {
    width: 100%;
    text-align: left;
  }

  &.coop-grade-result-count {
    text-align: right;
  }
}

div {
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
}
</style>
