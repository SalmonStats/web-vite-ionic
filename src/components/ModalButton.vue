<script setup lang="ts">
import { IonItem, IonLabel, IonImg, IonFab, IonFabButton, IonIcon, modalController, IonModal } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import ParamView from '@/views/ParamView.vue';
import { filterOutline } from 'ionicons/icons';
import { Parameters } from '@/types/common';
import { ref, Ref } from 'vue';

interface Emits {
  (e: 'parameters', value: Parameters): void;
}

interface Props {
  parameters: Parameters;
}

const { t } = useI18n()
const emit = defineEmits<Emits>()
const props = defineProps<Props>()

async function present() {
  const modal = await modalController.create({
    component: ParamView,
    componentProps: {
      parameters: props.parameters,
    },
    keyboardClose: true,
    showBackdrop: true,
    animated: true,
    swipeToClose: true,
    presentingElement: undefined,
    canDismiss: true,
  });
  modal.present()

  const { data, role } = await modal.onWillDismiss();
  if (role === 'confirm') {
    emit('parameters', data as Parameters);
  }
}
</script>

<template>
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton @click="present">
      <IonIcon :icon="filterOutline" size="large"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<style lang="scss" scoped>
</style>
