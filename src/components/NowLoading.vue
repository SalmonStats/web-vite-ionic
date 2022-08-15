89<script setup lang="ts">
import { IonProgressBar, IonToolbar, IonListHeader, IonList, IonTitle } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale } = useI18n()

</script>

<template>
  <IonList>
    <IonListHeader>
      <IonToolbar>
        <IonTitle>{{ t("title.headers.loading") }}</IonTitle>
      </IonToolbar>
    </IonListHeader>
    <IonProgressBar type="indeterminate"></IonProgressBar>
  </IonList>
</template>
