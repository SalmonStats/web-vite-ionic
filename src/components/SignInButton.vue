<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon, IonModal, IonButton, modalController } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { personCircleOutline } from 'ionicons/icons';
import SignInView from '@/views/SignInView.vue';

const { t } = useI18n()

async function present() {
  const modal = await modalController.create({
    component: SignInView,
    swipeToClose: true,
  });

  modal.present()
}
</script>

<template>
  <IonButton @click="present">
    <IonIcon :icon="personCircleOutline" size="large"></IonIcon>
  </IonButton>
</template>

<style lang="scss" scoped>
</style>
