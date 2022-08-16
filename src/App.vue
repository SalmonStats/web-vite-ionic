<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonBackdrop } from '@ionic/vue';
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
</style>
