<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { SortType } from '@/types/enum';
</script>

<template>
  <IonItem>
    <IonLabel>取得件数</IonLabel>
    <IonSelect interface="action-sheet">
      <template v-for="limit in [10, 20, 50, 100]" :key="limit">
        <IonSelectOption>{{ limit }}</IonSelectOption>
      </template>
    </IonSelect>
  </IonItem>
</template>
