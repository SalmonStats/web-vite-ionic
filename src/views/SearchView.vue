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

const { t } = useI18n()
const items = Array.from(Array(50).keys());
</script>

<template>
  <IonPage>
  </IonPage>
</template>

<style scoped>
</style>
