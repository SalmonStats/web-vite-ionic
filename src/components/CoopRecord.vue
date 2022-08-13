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
      <div>
        <section>
          <IonLabel>{{ t(`schedule.stage.${result.stage_id}`) }}</IonLabel>
        </section>
        <section>
          {{ result.night.team_results.golden_ikura_num }}
        </section>
      </div>
    </IonItem>
  </template>
</template>
