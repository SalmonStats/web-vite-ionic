<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { SortType } from '@/types/enum';
</script>

<template>
  <IonItem>
    <IonLabel>並び順</IonLabel>
    <IonSelect interface="action-sheet">
      <template v-for="sortType in Object.values(SortType)" :key="sortType">
        <IonSelectOption>{{ sortType }}</IonSelectOption>
      </template>
    </IonSelect>
  </IonItem>
</template>
