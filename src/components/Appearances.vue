<script setup lang="ts">
import { IonItem, IonLabel, IonItemGroup, IonToggle, IonListHeader, IonIcon } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { contrastOutline, languageOutline, logoTwitter, snowOutline } from 'ionicons/icons';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { setDeviceThemeParams, getDeviceThemeParams } from '@/types/common/appearances';
const { t, availableLocales, locale } = useI18n()

// 現在ダークテーマを利用しているかどうか
const isDarkTheme: Ref<boolean> = ref<boolean>((() => {
  const { theme } = getDeviceThemeParams()
  return theme === 'dark'
})())

onMounted(() => {
  console.log("Mounted")
})

function changedTheme() {
  const theme = isDarkTheme.value ? 'light' : 'dark';
  isDarkTheme.value = !isDarkTheme.value
  setDeviceThemeParams({ theme: theme })
  document.body.setAttribute('color-scheme', theme)
}

function changedLang() {
  const index = (availableLocales.indexOf(locale.value) + 1) % availableLocales.length;
  const lang = availableLocales[index]
  locale.value = lang
  setDeviceThemeParams({ lang: lang })
}
</script>

<template>
  <IonItemGroup>
    <IonListHeader lines="none" mode="ios">
      <IonLabel>{{ t("title.labels.appearances") }}</IonLabel>
    </IonListHeader>
    <IonItem>
      <IonLabel slot="start">{{ t("title.labels.theme") }}</IonLabel>
      <IonToggle slot="end" @ion-change="changedTheme" :checked="isDarkTheme"></IonToggle>
    </IonItem>
    <IonItem>
      <IonLabel slot="start">{{ t("title.labels.languages") }}</IonLabel>
      <IonToggle slot="end" @ionChange="changedLang" :checked="locale === 'en'"></IonToggle>
    </IonItem>
  </IonItemGroup>
</template>
