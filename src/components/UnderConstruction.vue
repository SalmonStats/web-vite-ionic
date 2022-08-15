89<script setup lang="ts">
import { IonProgressBar, IonToolbar, IonListHeader, IonList, IonTitle, IonIcon, IonLabel, IonItem } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { constructOutline } from 'ionicons/icons';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale } = useI18n()

</script>

<template>
  <div class="fullscreen">
    <IonIcon :icon="constructOutline"></IonIcon>
    <IonLabel>{{ t("title.labels.construction") }}</IonLabel>
  </div>
</template>

<style lang="scss" scoped>
.fullscreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

ion-icon {
  font-size: 64px !important;
}
</style>
