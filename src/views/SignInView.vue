<script setup lang="ts">
import { IonContent, IonList, modalController, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
// import { ref, Ref } from 'vue';
// import { SplatNet2 } from '@/types/common';
import CoopAccount from '@/components/CoopAccount.vue';
import { closeOutline } from 'ionicons/icons';
import Appearances from '../components/Appearances.vue';

const { t, availableLocales, locale } = useI18n()
// const account: Ref<SplatNet2 | null> = ref<SplatNet2>((() => {
//   const account = localStorage.getItem('account')
//   if (account) {
//     return JSON.parse(account)
//   }
//   return null
// })())

// onIonViewDidEnter(() => {
//   console.log(account.value)
// })

// モーダルを閉じるときに変更内容を送信
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
