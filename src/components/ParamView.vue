<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  isPlatform,
  IonToolbar,
  IonSelect,
  IonItem,
  IonLabel,
  IonSelectOption,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref, Ref } from 'vue';
import { Result } from '@/types/splatnet2';
import CoopResultOverview from '@/components/CoopResultOverview.vue';
import { SortType } from '@/types/enum';

const { t } = useI18n()
</script>

<template>
  <IonToolbar>
    <IonItem>
      <IonLabel></IonLabel>
      <IonSelect interface="action-sheet" mode="ios" placeholder="並び順">
        <IonSelectOption :value="SortType.CREATED">アップロード順</IonSelectOption>
        <IonSelectOption :value="SortType.PLAYED">あそんだ順</IonSelectOption>
        <IonSelectOption :value="SortType.GOLDEN">金イクラ納品数順</IonSelectOption>
        <IonSelectOption :value="SortType.POWER">赤イクラ獲得数順</IonSelectOption>
      </IonSelect>
      <IonSelect interface="action-sheet" mode="ios" placeholder="ステージ">
        <IonSelectOption>指定なし</IonSelectOption>
        <template v-for="stageId in [5000, 5001, 5002, 5003, 5004]" :key="stageId">
          <IonSelectOption>{{ t(`schedule.stage.${stageId}`) }}</IonSelectOption>
        </template>
      </IonSelect>
    </IonItem>
  </IonToolbar>
</template>
