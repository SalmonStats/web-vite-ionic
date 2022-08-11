<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import axios from 'axios';

const { t } = useI18n()
const items = Array.from(Array(50).keys());

onMounted(() => {
  const url = `${import.meta.env.VITE_APP_URL}/results`
  axios.get(url)
    .then(res => {
      console.log(res.data)
    })
})
import { onMounted } from 'vue';
</script>

<template>
  <IonPage>
    <CoopHeader title="Results" />
  </IonPage>
</template>

<style scoped>
</style>
