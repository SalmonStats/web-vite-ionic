<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel, IonItemGroup, IonInput, toastController, IonListHeader } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { openOutline } from 'ionicons/icons';
import { APIError, SplatNet2 } from '@/types/common';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const oauthURL: string = (() => {
  const parameters: URLSearchParams = new URLSearchParams({
    state: 'IRrMqSizhgmBC9Xg8NpPLZ8tPT-eD_J-42OAmA5pIsJt6poJ',
    redirect_uri: 'npf71b963c1b7b6d119://auth',
    client_id: '71b963c1b7b6d119',
    scope: 'openid user user.birthday user.mii user.screenName',
    response_type: 'session_token_code',
    session_token_code_challenge: 'N-LF14-SA29V-3CMeQKzI7S0JRtensurBbj8p1epQFg',
    session_token_code_challenge_method: 'S256',
    theme: 'login_form',
  })
  const baseURL: URL = new URL(`https://accounts.nintendo.com/connect/1.0.0/authorize?${parameters}`)
  return baseURL.toString()
})()
const session_token_code: Ref<string> = ref<string>("")

const verifier: string = "CKnvS8q-g07V0zTtfnSpZmbAQzEvNsuS960b3JWoC5E"

function authorize() {
  window.open(oauthURL, '_blank');
}

async function signIn() {
  const url = `${import.meta.env.VITE_APP_URL}/authorize/login`
  const parameters = {
    session_token_code_verifier: verifier,
    session_token_code: session_token_code.value
  }

  try {
    // レスポンス
    const response = JSON.stringify((await axios.post(url, parameters)).data)
    // アカウント
    const account: SplatNet2 = JSON.parse(response) as SplatNet2
    const toast = await toastController
      .create({
        message: t("messages.success.login", { nickname: account.nickname }),
        duration: 2000
      })
    // アカウント情報の保存
    localStorage.setItem('account', JSON.stringify(account))
    return toast.present()
  } catch (error) {
    const { error_description, errorMessage } = ((error as AxiosError).response?.data as APIError)
    const toast = await toastController
      .create({
        message: t(`messages.error.${error_description ?? errorMessage}`),
        duration: 2000
      })
    return toast.present()
  }
}

function signOut() {
  localStorage.removeItem('account')
}

onMounted(() => {

})
</script>

<template>
  <IonItemGroup>
    <IonListHeader lines="none" mode="ios">
      <IonLabel>Nintendo</IonLabel>
    </IonListHeader>
    <IonItem>
      <IonLabel>{{ t("title.labels.login") }}</IonLabel>
      <IonButton size="default" @click="authorize">
        <IonLabel slot="start">{{ t("title.buttons.open") }}</IonLabel>
        <IonIcon :icon="openOutline" size="default" slot="end"></IonIcon>
      </IonButton>
    </IonItem>
    <IonItem>
      <IonInput placeholder="URL" v-model="session_token_code" type="password"></IonInput>
      <IonButton size="default" @click="signIn">
        <IonLabel slot="start">{{ t("title.buttons.authorize") }}</IonLabel>
      </IonButton>
    </IonItem>
  </IonItemGroup>
</template>
