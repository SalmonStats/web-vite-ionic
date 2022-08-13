import { Schedule } from '@/types/splatnet2';
<script setup lang="ts">
import { IonItem, IonLabel, IonImg } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from '@/types/splatnet2';
import { bossURL } from '@/functions';

const { t } = useI18n()

const props = defineProps<{
  result: Result
}>()

Array.prototype.sum = function () {
  const items = this as number[];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, num) => sum + num, 0);
};
</script>

<template>
  <template v-for="index in [...new Array(9).keys()]" :key="index">
    <IonItem v-if="result.boss_counts[index] !== 0">
      <div class="coop-result-player-boss-defeated">
        <IonImg class="coop-result-boss-defeated" :src="bossURL(index)"></IonImg>
        <template v-for="player in result.players" :key="player.nsaid">
          <IonLabel class="coop-result-boss-defeated-num">{{ player.boss_kill_counts[index] }}</IonLabel>
        </template>
        <IonLabel class="coop-result-boss-defeated-total" :class="result.boss_counts[index] === result.players.map(player =>
        player.boss_kill_counts[index]).sum() ? 'defeated' : ''">{{ ("00" + result.players.map(player =>
      player.boss_kill_counts[index]).sum()).slice(-2)
  }}/{{ ("00" + result.boss_counts[index]).slice(-2) }}
        </IonLabel>
      </div>
    </IonItem>
  </template>
</template>

<style lang="scss" scoped>
@import "@/theme/style.scss";

.coop-result-player-boss-defeated {
  display: block;
  width: 100%;
  max-width: 800px;
  display: flex;
  margin: 0 auto;
}

ion-img {
  &.coop-result-boss-defeated {
    max-width: 40px;
  }
}

ion-label {
  &.defeated {
    color: #00ff00;
  }

  &.coop-result-boss-defeated-num {
    width: calc((100% - 25%) / 4) !important;
    text-align: right;
    line-height: 250%;
  }

  &.coop-result-boss-defeated-total {
    font-weight: 600;
    width: 25% !important;
    text-align: right;
    line-height: 250%;
  }
}
</style>
