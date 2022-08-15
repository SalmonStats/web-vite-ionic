<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonIcon, IonContent, IonItem, IonLabel, IonImg } from '@ionic/vue';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs';
import { PlayerResult, WaveResult } from '@/types/splatnet2';
import { weaponURL, specialURL } from '@/functions';

const { t } = useI18n()

const props = defineProps<{
  players: PlayerResult[]
}>()

Array.prototype.sum = function () {
  const items = this as number[];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, num) => sum + num, 0);
};
</script>

<template>
  <template v-for="player in players" :key="player.nsaid">
    <IonItem button :router-link="`/users/${player.nsaid}`">
      <div class="coop-player-result">
        <section class="coop-player-result-summary">
          <IonLabel>
            {{ player.name }}
          </IonLabel>
          <div class="coop-weapon-list">
            <template v-for="weaponId in player.weapon_list" :key="weaponId">
              <IonImg class="coop-weapon-item" :src="weaponURL(weaponId)"></IonImg>
            </template>
            <IonImg class="coop-weapon-special" :src="specialURL(player.special_id)"></IonImg>
          </div>
        </section>
        <section class="coop-player-result-detail">
          <IonLabel class="golden-ikura num">{{ player.golden_ikura_num }}</IonLabel>
          <IonLabel class="ikura num">{{ player.ikura_num }}</IonLabel>
          <IonLabel class="num">{{ player.help_count }}</IonLabel>
        </section>
        <section class="coop-player-result-detail">
          <IonLabel class="">{{ player.grade_point ?? "-" }}</IonLabel>
          <IonLabel class="num">{{ player.boss_kill_counts.sum() }}</IonLabel>
          <IonLabel class="num">{{ player.dead_count }}</IonLabel>
        </section>
      </div>
    </IonItem>
  </template>
</template>

<style lang="scss" scoped>
@import "@/theme/style.scss";

.coop-player-result {
  width: 100%;
  max-width: 800px;
  display: flex;
  margin: 0 auto;
}

.coop-player-result-summary {
  width: 100%;
  max-width: 800px;
}

.coop-player-result-detail {
  min-width: 60px;
  text-align: right;
}

.coop-weapon-list {
  display: flex;
}

ion-img {
  &.coop-weapon-item {
    width: 30px;
    aspect-ratio: 1;
    max-width: 30px;
  }

  &.coop-weapon-special {
    width: 30px;
    aspect-ratio: 1;
    max-width: 30px;
  }
}
</style>
