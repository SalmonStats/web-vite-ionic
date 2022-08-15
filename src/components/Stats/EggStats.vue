<script setup lang="ts">
import { WaveResult } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const props = defineProps<{
  results: WaveResult[][]
}>()

Array.prototype.sum = function () {
  const items = this as number[];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, num) => sum + num, 0);
};

const results = props.results.reverse()
</script>

<template>
  <IonList>
    <template v-for="(waves, index) in results">
      <IonListHeader mode="ios">
        <IonLabel>
          {{ t(`wave_result.water_level.${2 - index}`) }}
        </IonLabel>
      </IonListHeader>
      <template v-for="wave in waves">
        <IonItem v-if="wave !== null" button>
          <div class="coop-wave-result">
            <section>
              <IonLabel>{{ t(`wave_result.event_type.${wave.event_type}`) }}</IonLabel>
              <IonLabel class="prob">
                {{ (wave.count / waves.map(wave => wave?.count ?? 0).sum() * 100).toFixed(3) }}
              </IonLabel>
            </section>
            <section class="coop-wave-appearances">
              <IonLabel class="golden-ikura num">
                {{ wave.golden_ikura_num }}
              </IonLabel>
              <IonLabel class="ikura num">
                {{ wave.ikura_num }}
              </IonLabel>
            </section>
          </div>
        </IonItem>
      </template>
    </template>
  </IonList>
</template>

<style lang="scss" scoped>
// .coop-wave-result {
//   display: flex;
//   flex-direction: column;
//   // align-items: center;
//   // justify-content: center;
// }

// section {
//   width: 50%;
// }

.coop-wave-appearances {
  text-align: right;
}

div {
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
