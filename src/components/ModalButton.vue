<script setup lang="ts">
import { IonItem, IonLabel, IonImg, IonFab, IonFabButton, IonIcon, modalController, IonModal } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import ParamView from '@/views/ParamView.vue';
import { filterOutline } from 'ionicons/icons';
import { OrderType, SortType, SplatNet2 } from '@/types/enum';
import { bossURL } from '@/functions';
import axios from 'axios';
import { Parameters } from '@/types/common';
import { ref, Ref } from 'vue';

interface Emits {
  (e: 'parameters', value: Parameters): void;
}

const { t } = useI18n()
const emit = defineEmits<Emits>()
const props = defineProps<{
  parameters: Parameters
}>()
</script>

<template>
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton id="open-modal">
      <IonIcon :icon="filterOutline" size="large"></IonIcon>
    </IonFabButton>
    <IonModal trigger="open-modal">
      <ParamView :parameters="parameters" @parameters="(value) => emit('parameters', value)" />
    </IonModal>
  </IonFab>
</template>

<style lang="scss" scoped>
</style>
