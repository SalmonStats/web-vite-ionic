<script setup lang="ts">
import {
  IonContent,
  IonList,
  IonTitle,
  IonButton,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { closeOutline } from 'ionicons/icons';
import { modalController } from '@ionic/core';
import SortButton from '@/components/ParamButton/SortButton.vue';
import LimitButton from '@/components/ParamButton/LimitButton.vue';
import StageButton from '@/components/ParamButton/StageButton.vue';
import { ref, Ref } from 'vue';
import { Parameters } from '@/types/common';
import { OrderType, SortType } from '@/types/enum';
import GoldenIkura from '@/components/ParamButton/GoldenIkura.vue';
import NightLess from '@/components/ParamButton/NightLess.vue';
import Ikura from '@/components/ParamButton/Ikura.vue';

interface Emits {
  (e: 'parameters', value: Parameters): void;
}
const { t } = useI18n()
const emit = defineEmits<Emits>()
const props = defineProps<{
  parameters: Parameters
}>()

// 設定用のモーダル(上書きできるやつ)
const parameters: Ref<Parameters> = ref<Parameters>({
  // 受け取ったデータで初期化する
  limit: props.parameters.limit,
  sort: props.parameters.sort,
  order: props.parameters.order,
  nightless: props.parameters.nightless,
  golden_ikura_num: props.parameters.golden_ikura_num,
  ikura_num: props.parameters.ikura_num,
  is_clear: props.parameters.is_clear
} as Parameters)

// モーダルを閉じるときに変更内容を送信
async function dismiss() {
  console.log("Emit!")
  modalController.dismiss(parameters.value, 'cancel')
}
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons>
        <IonButton @click="dismiss">
          <IonIcon slot="icon-only" :icon="closeOutline"></IonIcon>
        </IonButton>
        <IonTitle>検索設定</IonTitle>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonList>
      <LimitButton :parameters="parameters" @limit="(value) => parameters.limit = value" />
      <SortButton :parameters=parameters @sort_type="(value) => parameters.sort = value" />
      <GoldenIkura :parameters="parameters" @golden_ikura_num="(value) => parameters.golden_ikura_num = value" />
      <Ikura :parameters="parameters" @ikura_num="(value) => parameters.ikura_num = value" />
      <NightLess :parameters="parameters" @nightless="(value: boolean) => parameters.nightless = value" />
      <StageButton />
    </IonList>
  </IonContent>
</template>
