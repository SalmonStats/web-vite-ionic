<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { getDeviceThemeParams } from './types/common/appearances';

onMounted(() => {
  const { theme } = getDeviceThemeParams()
  document.body.setAttribute('color-scheme', theme)
})
</script>

<template>
  <IonApp>
    <IonRouterOutlet></IonRouterOutlet>
  </IonApp>
</template>

<style>
@import "@/theme/style.scss";
</style>
