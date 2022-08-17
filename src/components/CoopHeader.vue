<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonIcon } from '@ionic/vue';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import SignInButton from '@/components/SignInButton.vue'
import TwitterButton from './TwitterButton.vue';

interface Props {
  title: string
}

const props = defineProps<Props>();
const { t, availableLocales, locale } = useI18n()
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="primary">
        <SignInButton />
      </IonButtons>
      <IonTitle>{{ props.title }}</IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

