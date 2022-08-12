<script setup lang="ts">
import { IonItem, IonLabel, IonImg } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from '@/types/splatnet2';
import { weaponURL } from '@/functions';
const { t } = useI18n()

const props = defineProps<{
  result: Result
}>()
</script>

<template>
  <IonItem button :router-link="`/results/${result.salmon_id}`">
    <div class="coop-result">
      <section class="coop-result-overview">
        <IonLabel>
          {{ t(`job_result.${result.job_result.is_clear}`)}}
        </IonLabel>
        <IonLabel>
          {{ result.danger_rate }}%
        </IonLabel>
      </section>
      <section class="coop-result-waves">
        <template v-for="wave in result.waves" :key="wave.quota_num">
          <IonLabel>
            {{ t(`wave_result.water_level.${wave.water_level}`)}} {{
            t(`wave_result.event_type.${wave.event_type}`)}}
          </IonLabel>
        </template>
      </section>
      <section class="coop-result-eggs">
        <div class="coop-result-weapon-list">
          <template v-for="weaponId in result.schedule.weapon_list" :key="weaponId">
            <IonImg class="coop-result-weapon-item" :src="weaponURL(weaponId)"></IonImg>
          </template>
        </div>
        <IonLabel class="golden-ikura num">
          {{ result.golden_ikura_num }}
        </IonLabel>
        <IonLabel class="ikura num">
          {{ result.ikura_num }}
        </IonLabel>
      </section>
    </div>
  </IonItem>
</template>

<style lang="scss" scoped>
.coop-result {
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 6px 0;

  .coop-result-overview {
    font-size: 14px;
    width: 18%;
    max-width: 80px;
  }

  .coop-result-waves {
    font-size: 14px;
    width: 52%;
  }
  
  .coop-result-eggs {
    font-size: 14px;
    width: 35%;
    text-align: right;
  }

  .coop-result-weapon-list {
    display: flex;
    justify-content: flex-end
  }

  .coop-result-weapon-item {
    width: 25%;
    max-width: 35px;
    background-color: var(--ion-color-step-450);
    border-radius: 50%;
  }
}
</style>
