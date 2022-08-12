<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  onIonViewWillEnter,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopHeader from '@/components/CoopHeader.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref, Ref } from 'vue';
import { Result } from '@/types/splatnet2';
import CoopResultOverview from '@/components/CoopResultOverview.vue';

const { t } = useI18n()
const items = Array.from(Array(50).keys());
const results: Ref<Result[]> = ref<Result[]>([])

onIonViewWillEnter(() => {
  const url = `${import.meta.env.VITE_APP_URL}/results`
  axios.get(url)
    .then((res) => {
      results.value = res.data.results
      console.log(results.value)
    })
})
// onMounted(() => {
// })
</script>

<template>
  <IonPage>
    <CoopHeader :title="t('title.headers.results')" />
    <IonContent>
      <template v-for="result in results" :key="result.salmon_id">
        <CoopResultOverview :result="result" />
      </template>
    </IonContent>
  </IonPage>
</template>

<style scoped>
</style>
