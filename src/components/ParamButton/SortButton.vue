<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { SortType } from '@/types/enum';
import { Parameters } from '@/types/common';

interface Emits {
  (e: 'sort_type', value: string): void;
}
const { t } = useI18n()
const emit = defineEmits<Emits>();

const props = defineProps<{
  parameters: Parameters
}>()
</script>

<template>
  <IonItem>
    <IonLabel>並び順</IonLabel>
    <IonSelect interface="action-sheet" @ion-change="(value) => emit('sort_type', value.detail.value as string)"
      :value="props.parameters.sort">
      <template v-for="sortType in Object.values(SortType)" :key="sortType">
        <IonSelectOption :value="sortType">{{ t(`select.labels.${sortType}`) }}</IonSelectOption>
      </template>
    </IonSelect>
  </IonItem>
</template>
