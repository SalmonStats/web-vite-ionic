<script setup lang="ts">
import { IonItem, IonLabel, IonImg } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Results } from '@/types/salmonstats';
const { t } = useI18n()

const props = defineProps<{
  results: Results[]
}>()
</script>

<template>
  <template v-for="result in results" :key="result.stage_id">
    <IonItem>
      <div class="coop-player-records">
        <section class="coop-stage-information">
          <IonLabel>{{ t(`schedule.stage.${result.stage_id}`) }}</IonLabel>
        </section>
        <section class="coop-player-stage-record">
          <IonLabel>{{ t("results.night") }} {{ result.night.team_results.golden_ikura_num }}</IonLabel>
          <IonLabel>{{ t("results.nightless") }} {{ result.nightless.team_results.golden_ikura_num }}</IonLabel>
        </section>
      </div>
    </IonItem>
  </template>
</template>

<style lang="scss" scoped>
.coop-player-records {
  width: 100%;
  max-width: 800px;
  display: flex;
  margin: 0 auto;
}

.coop-stage-information {
  width: 60%;
}

.coop-player-stage-record {
  width: 40%;
  text-align: right;
}
</style>
