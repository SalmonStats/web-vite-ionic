<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Parameters } from '@/types/common';

const { t } = useI18n()

interface Emits {
  (e: 'golden_ikura_num', value: number): void;
}
const emit = defineEmits<Emits>()
const props = defineProps<{
  parameters: Parameters
}>()

</script>

<template>
  <IonItem>
    <IonLabel>{{ t("parameters.minimum_golden_ikura_num") }}</IonLabel>
    <IonSelect interface="action-sheet" @ion-change="(value) => emit('golden_ikura_num', value.detail.value as number)"
      :value="props.parameters.golden_ikura_num">
      <template v-for="golden_ikura_num in [0, 100, 125, 150, 175, 200]" :key="golden_ikura_num">
        <IonSelectOption :value="golden_ikura_num">{{ golden_ikura_num }}</IonSelectOption>
      </template>
    </IonSelect>
  </IonItem>
</template>
