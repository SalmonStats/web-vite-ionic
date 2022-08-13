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
import SearchBar from '@/components/SearchBar.vue';

const { t } = useI18n()
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.search')" />
    <IonContent>
      <SearchBar />
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
