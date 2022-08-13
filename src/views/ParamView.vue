<script setup lang="ts">
import {
  IonContent,
  IonList,
  IonTitle,
  IonButton,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonIcon
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { closeOutline } from 'ionicons/icons';
import { modalController } from '@ionic/core';
import SortButton from '@/components/ParamButton/SortButton.vue';
import LimitButton from '@/components/ParamButton/LimitButton.vue';
import StageButton from '@/components/ParamButton/StageButton.vue';

const { t } = useI18n()

async function dismiss() {
  modalController.dismiss(null, 'cancel')
}
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons>
        <IonButton @click="dismiss">
          <IonIcon slot="icon-only" :icon="closeOutline"></IonIcon>
        </IonButton>
        <IonTitle>検索設定</IonTitle>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonList>
      <LimitButton />
      <SortButton />
      <StageButton />
    </IonList>
  </IonContent>
</template>
