<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonIcon } from '@ionic/vue';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

interface Props {
  title: string
}

const props = defineProps<Props>();
const { t, availableLocales, locale } = useI18n()

function changeLanguages() {
  const index = (availableLocales.indexOf(locale.value) + 1) % availableLocales.length;
  locale.value = availableLocales[index]
}

onMounted(() => {
  // デバイスの設定を取得して反映させる
  const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.body.setAttribute('color-scheme', prefersTheme ? 'dark' : 'light')
})

function changeTheme() {
  const theme = document.body.getAttribute('color-scheme') === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('color-scheme', theme)
}
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <!-- <IonButtons slot="start" router-link="/">
        <IonIcon :icon="snowOutline" slot="icon-only">
        </IonIcon>
      </IonButtons> -->
      <IonButtons slot="primary">
        <IonButton @click="changeLanguages">
          <IonIcon slot="icon-only" :icon="languageOutline">
          </IonIcon>
        </IonButton>
        <IonButton @click="changeTheme()">
          <IonIcon slot="icon-only" :icon="contrastOutline">
          </IonIcon>
        </IonButton>
        <IonButton router-link="/login">
          <IonIcon slot="icon-only" :icon="logoTwitter">
          </IonIcon>
        </IonButton>
      </IonButtons>
      <IonTitle>{{ props.title }}</IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

