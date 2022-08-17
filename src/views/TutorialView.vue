<script setup lang="ts">
import { IonContent, IonButton, IonIcon, IonItem, IonLabel, IonItemGroup, IonInput, toastController, IonListHeader, isPlatform, IonBackdrop, IonText } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { openOutline, alertCircleOutline } from 'ionicons/icons';
import { APIError, SplatNet2 } from '@/types/common';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <IonContent>
    <!-- <IonLabel>AAA</IonLabel> -->
    <video src="https://video.twimg.com/ext_tw_video/1559752357776220160/pu/vid/720x1560/OVXVkRMRRXEO2hfb.mp4"></video>
  </IonContent>
</template>

<style lang="scss" scoped>
</style>
