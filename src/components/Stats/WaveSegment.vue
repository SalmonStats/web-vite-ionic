<script setup lang="ts">
import {
  IonToolbar,
  IonSegment,
  IonSegmentButton
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n()
const router = useRoute()

interface Emits {
  (e: "segmentChanged", value: number): void;
}

interface Props {
  waveId: number
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()
</script>

<template>
  <IonToolbar>
    <IonSegment @ionChange="(ev) => emit('segmentChanged', Number(ev.detail.value))" :value="waveId.toString()">
      <template v-for="waveId in [0, 1, 2, 3]">
        <IonSegmentButton :value="(waveId).toString()">{{ waveId !== 0 ? waveId : 'All' }}</IonSegmentButton>
      </template>
    </IonSegment>
  </IonToolbar>
</template>

<style lang="scss" scoped>
</style>
