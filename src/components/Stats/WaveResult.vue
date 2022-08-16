<script setup lang="ts">
import { TotalResult, WaveResult, ResultDetail } from '@/types/salmonstats';
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon, IonList, IonAvatar, IonImg, IonThumbnail } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n()

const props = defineProps<{
  rank: number
  result: ResultDetail
}>()
</script>

<template>
  <IonItem>
    <div class="coop-wave-result">
      <div class="coop-wave-result-header">
        <div class="coop-wave-result-rank">
          <IonLabel class="rank">{{ rank }}</IonLabel>
        </div>
        <div class="coop-wave-result-value">
          <IonLabel class="golden-ikura num">{{ result.golden_ikura_num }}</IonLabel>
        </div>
      </div>
      <div class="coop-wave-result-content">
        <div class="coop-wave-result-player-list">
          <template v-for="member in result.members">
            <div class="coop-wave-result-player-list-item">
              <IonAvatar>
                <IonImg :src="member.thumbnail_url" />
              </IonAvatar>
              <IonLabel class="nickname">{{ member.nickname }}</IonLabel>
            </div>
          </template>
        </div>
      </div>
    </div>
  </IonItem>
</template>

<style lang="scss" scoped>
ion-avatar {
  width: 30px;
  height: 30px;
  margin-right: 4px;
}

ion-label {
  font-size: 17px !important;

  &.nickname {
    font-size: min(3.5vw, 16px) !important;
  }

  &.rank {
    font-size: min(5vw, 20px) !important;
  }
}

.coop-wave-result {
  width: 100%;
  max-width: 800px;
}

.coop-wave-result-content {
  width: 100%;
  max-width: 800px;
}

.coop-wave-result-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.coop-wave-result-player-list {
  width: calc(100%);
  column-count: 2;
}

.coop-wave-result-player-list-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
</style>
