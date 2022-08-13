<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonInput, toastController, IonItemGroup, onIonViewDidEnter } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import CoopHeader from '@/components/CoopHeader.vue';
import { ref, Ref } from 'vue';
import axios, { AxiosError } from "axios";
import { SplatNet2 } from '@/types/enum';
import CoopAccount from '@/components/CoopAccount.vue';

const { t, availableLocales, locale } = useI18n()
const account: Ref<SplatNet2 | null> = ref<SplatNet2>((() => {
  const account = localStorage.getItem('account')
  if (account) {
    return JSON.parse(account)
  }
  return null
})())

onIonViewDidEnter(() => {
  console.log(account.value)
})
</script>

<template>
  <IonPage>
    <IonContent>
      <CoopHeader :title="t('title.headers.signin')" />
      <IonList>
        <CoopAccount />
      </IonList>
    </IonContent>
  </IonPage>
</template>
