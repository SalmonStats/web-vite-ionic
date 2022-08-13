<script setup lang="ts">
import { IonItem, IonLabel, IonImg, IonFab, IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import ParamView from '@/views/ParamView.vue';
import { filterOutline } from 'ionicons/icons';
import { SplatNet2 } from '@/types/enum';
import { bossURL } from '@/functions';
import axios from 'axios';

const { t } = useI18n()

async function openModal() {
  const modal = await modalController.create({
    component: ParamView,
    swipeToClose: true,
  })
  modal.present()
}
</script>

<template>
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton @click="openModal">
      <IonIcon :icon="filterOutline" size="large"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<style lang="scss" scoped>
</style>
