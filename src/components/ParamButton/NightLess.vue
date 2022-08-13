<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Parameters } from '@/types/common';

interface Emits {
  (e: 'nightless', value: boolean): void;
}

const { t } = useI18n()
const emit = defineEmits<Emits>();
const props = defineProps<{
  parameters: Parameters
}>()
</script>

<template>
  <IonItem>
    <IonLabel>昼のみ記録</IonLabel>
    <IonToggle @ion-change="(value) => emit('nightless', value.detail.checked)" :checked="props.parameters.nightless">
    </IonToggle>
  </IonItem>
</template>
