<script setup lang="ts">
import { IonContent, IonList, modalController, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import CoopAccount from '@/components/CoopAccount.vue';
import { closeOutline } from 'ionicons/icons';
import Appearances from '../components/Appearances.vue';

const { t, availableLocales, locale } = useI18n()

// モーダルを閉じる
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
        <IonTitle>{{ t("title.headers.account") }}</IonTitle>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonList>
      <CoopAccount />
      <Appearances />
    </IonList>
  </IonContent>
</template>
