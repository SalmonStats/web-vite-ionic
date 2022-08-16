<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Parameters } from '@/types/common';

interface Emits {
  (e: 'limit', value: number): void;
}
const { t } = useI18n()
const emit = defineEmits<Emits>();

const props = defineProps<{
  parameters: Parameters
}>()

function changedValue(event: CustomEvent) {
  emit('limit', event.detail.value);
}
</script>

<template>
  <IonItem>
    <IonLabel>{{ t("parameters.count") }}</IonLabel>
    <IonSelect interface="action-sheet" @ion-change="changedValue" :value="props.parameters.limit">
      <template v-for="limit in [15, 25, 50, 100]" :key="limit">
        <IonSelectOption :value="limit">{{ limit }}</IonSelectOption>
      </template>
    </IonSelect>
  </IonItem>
</template>
