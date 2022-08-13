<script setup lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { SortType } from '@/types/enum';
import { Parameters } from '@/types/common';


const props = defineProps<{
  parameters: Parameters
}>()

</script>

<template>
  <IonItem>
    <IonLabel>最低イクラ獲得数</IonLabel>
    <IonSelect interface="action-sheet" :value="props.parameters.ikura_num">
      <template v-for="ikura_num in [1000, 2000, 3000, 4000, 5000, 6000]" :key="ikura_num">
        <IonSelectOption :value="ikura_num">{{ ikura_num }}</IonSelectOption>
      </template>
    </IonSelect>
  </IonItem>
</template>
