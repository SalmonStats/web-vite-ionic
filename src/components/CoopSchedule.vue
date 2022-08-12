<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonIcon, IonContent, IonItem, IonLabel, IonImg } from '@ionic/vue';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs';
import { Schedule } from '@/types/splatnet2';
import { weaponURL } from '@/functions';

const { t } = useI18n()

const displayRareWeapon: Ref<boolean> = ref<boolean>(false)
const props = defineProps<{
  schedule: Schedule
}>()
</script>

<template>
  <IonItem>
    <div class="coop-schedule">
      <section class="coop-schedule-summary">
        <IonLabel>
          {{ dayjs(schedule.start_time).format('MM/DD HH:mm') }}
          -
          {{ dayjs(schedule.end_time).format('MM/DD HH:mm') }}
        </IonLabel>
        <IonLabel>
          {{ t(`schedule.stage.${schedule.stage_id}`) }}
        </IonLabel>
      </section>
      <section class="coop-weapon-list">
        <template v-for="weaponId in schedule.weapon_list" :key="weaponId">
          <IonImg class="coop-weapon-item" :src="weaponURL(weaponId)" v-if="weaponId !== -1"></IonImg>
          <IonImg class="coop-weapon-item"
            :src="weaponURL(displayRareWeapon ? (schedule.rare_weapon ?? 20000) : weaponId)" v-if="weaponId === -1"
            v-on:mouseover="displayRareWeapon = true" v-on:mouseleave="displayRareWeapon = false"></IonImg>
        </template>
      </section>
    </div>
  </IonItem>
</template>

<style lang="scss" scoped>
@import "@/theme/style.scss";

.coop-schedule {
  display: flex;
  font-size: 14px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.coop-schedule-summary {
  font-size: 14px;
  width: 60%;
}

.coop-weapon-list {
  display: flex;
  width: 40%;
  justify-content: flex-end;

  :not(:last-child) {
    margin-right: 4px;
  }
}

ion-img {
  &.coop-weapon-item {
    width: 25%;
    aspect-ratio: 1;
    max-width: 35px;
    background-color: var(--ion-color-step-450);
    border-radius: 50%;
  }
}
</style>
