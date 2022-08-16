<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { SortType } from '@/types/enum';

const { t } = useI18n()
</script>

<template>
  <IonItem :disabled="true">
    <IonLabel>{{ t("parameters.count") }}</IonLabel>
    <IonSelect interface="action-sheet">
      <template v-for="stageId in [5000, 5001, 5002, 5003, 5004]" :key="stageId">
        <IonSelectOption>{{ t(`schedule.stage.${stageId}`) }}</IonSelectOption>
      </template>
    </IonSelect>
  </IonItem>
</template>
