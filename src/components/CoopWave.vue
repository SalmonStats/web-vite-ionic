import { Schedule } from '@/types/splatnet2';
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonIcon, IonContent, IonItem, IonLabel, IonImg } from '@ionic/vue';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs';
import { WaveResult } from '@/types/splatnet2';
import { weaponURL } from '@/functions';

const { t } = useI18n()

const props = defineProps<{
  waves: WaveResult[]
}>()
</script>

<template>
  <template v-for="wave in waves" :key="wave.quota_num">
    <IonItem>
      <div class="coop-wave-result">
        <section class="coop-wave-result-summary">
          <IonLabel>
            {{ t(`wave_result.water_level.${wave.water_level}`) }} {{ t(`wave_result.event_type.${wave.event_type}`) }}
          </IonLabel>
        </section>
        <section class="coop-wave-result-detail">
          <IonLabel>
            {{ wave.golden_ikura_num}}/{{ wave.quota_num}}({{ wave.golden_ikura_pop_num}}) 
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

.coop-wave-result {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
}

.coop-wave-result-summary {
  width: 70%;
}

.coop-wave-result-detail {
  width: 30%;
  text-align: right;
}
</style>
