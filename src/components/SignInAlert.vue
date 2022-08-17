89<script setup lang="ts">
import SignInViewVue from '@/views/SignInView.vue';
import { IonProgressBar, IonToolbar, IonListHeader, IonList, IonTitle, IonIcon, IonLabel, IonItem, IonButton, IonContent, IonItemDivider, IonTextarea, modalController } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { alertCircleOutline } from 'ionicons/icons';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale } = useI18n()

async function signIn() {
  const modal = await modalController.create({
    component: SignInViewVue
  })
  modal.present()
}
</script>

<template>
  <IonContent fullscreen slot="fixed">
    <div id="fullscreen">
      <IonIcon :icon="alertCircleOutline"></IonIcon>
      <IonLabel>{{ t("title.labels.login_required") }}</IonLabel>
      <IonButton @click="signIn">
        <IonLabel>{{ t("title.labels.login") }}</IonLabel>
      </IonButton>
      <IonLabel>ログイン方法について</IonLabel>
      <IonTextarea>
        ログインにはGoogle Chromeが必要になります. iPhoneやiPadのブラウザ(Safari)ではログインできないのでApp StoreからGoogle Chromeをインストールしてください.
      </IonTextarea>
    </div>
  </IonContent>
</template>

<style lang="scss" scoped>
#fullscreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100vh;
}

ion-textarea {
  max-width: 600px;
  padding: 10px;
}

ion-icon {
  font-size: 64px !important;
}
</style>
