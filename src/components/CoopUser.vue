<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonIcon, IonContent, IonItem, IonLabel, IonImg, IonAvatar, IonItemGroup } from '@ionic/vue';
import { accessibilityOutline, openOutline } from 'ionicons/icons';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs';
import { weaponURL } from '@/functions';
import { Player } from '@/types/salmonstats';

const { t } = useI18n()

const props = defineProps<{
  player: Player
}>()
</script>

<template>
  <IonItemGroup>
    <IonItem>
      <IonAvatar slot="start">
        <IonImg :src="player.thumbnail_url" />
      </IonAvatar>
      <IonLabel slot="end">{{ player.nickname }}</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel slot="start">{{ t('title.labels.results') }}</IonLabel>
      <IonButton slot="end">
        <IonLabel slot="start">リザルト一覧</IonLabel>
        <IonIcon slot="end" :icon="openOutline"></IonIcon>
      </IonButton>
    </IonItem>
  </IonItemGroup>
</template>
