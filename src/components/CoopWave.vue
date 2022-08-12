import { Schedule } from '@/types/splatnet2';
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonIcon, IonContent, IonItem, IonLabel, IonImg } from '@ionic/vue';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs';
import { Result, WaveResult } from '@/types/splatnet2';
import { specialURL } from '@/functions';
import ResultsViewVue from '@/views/ResultsView.vue';

const { t } = useI18n()

const props = defineProps<{
  result: Result
}>()

const specialUsages = (() => {
  return [...Array(3).keys()].map((i) => {
    return props.result.players.flatMap((e) => {
      return Array(e.special_counts[i]).fill(e.special_id);
    }).sort()
  })
})()
</script>

<template>
  <template v-for="(wave, index) in result.waves" :key="wave.quota_num">
    <IonItem>
      <div class="coop-wave-result">
        <section class="coop-wave-result-summary">
          <IonLabel class="coop-wave-info">
            {{ t(`wave_result.water_level.${wave.water_level}`) }} {{ t(`wave_result.event_type.${wave.event_type}`) }}
          </IonLabel>
        </section>
        <section class="coop-wave-result-special">
          <ul class="coop-wave-result-special-list">
            <template v-for="specialId in specialUsages[index]">
              <li>
                <IonImg class="coop-special-item" :src="specialURL(specialId)"></IonImg>
              </li>
            </template>
          </ul>
        </section>
        <section class="coop-wave-result-detail">
          <IonLabel class="golden-ikura">
            {{ wave.golden_ikura_num }}/{{ wave.quota_num }}({{ wave.golden_ikura_pop_num }})
          </IonLabel>
          <IonLabel class="ikura num">
            {{ wave.ikura_num }}
          </IonLabel>
        </section>
      </div>
    </IonItem>
  </template>
</template>

<style lang="scss" scoped>
@import "@/theme/style.scss";

.coop-wave-info {
  font-size: 15px;
}

.coop-wave-result {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
}

.coop-wave-result-summary {
  width: calc(100% - 80px - 112px);
}

.coop-wave-result-detail {
  width: 80px;
  text-align: right;
}

.coop-wave-result-special {
  width: 112px;
  margin: 0 4px;
}

.coop-special-item {
  width: 25px;
}


ul {
  &.coop-wave-result-special-list {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    column-count: 4;
    margin: 0;
    padding: 0;
    justify-content: flex-end
  }
}
</style>
