<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel, IonItemGroup, IonInput, toastController, IonListHeader, isPlatform, IonBackdrop, IonText } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { openOutline, alertCircleOutline } from 'ionicons/icons';
import { APIError, SplatNet2 } from '@/types/common';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { modalController } from '@ionic/core';
import TutorialVue from '@/views/Tutorial.vue';
const { t } = useI18n()

const videoURL: string = "https://video.twimg.com/ext_tw_video/1559752357776220160/pu/vid/720x1560/OVXVkRMRRXEO2hfb.mp4"
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
const inProgress: Ref<boolean> = ref<boolean>(false)
const session_token_code: Ref<string> = ref<string>("")
const verifier: string = "CKnvS8q-g07V0zTtfnSpZmbAQzEvNsuS960b3JWoC5E"

// 認証用のURLを開く
function authorize() {
  window.open(oauthURL, '_blank');
}

// ログインする
async function signIn() {
  // 正規表現でチェックして最低限の要件を満たさない場合は何もしない
  if (!session_token_code.value.match("npf71b963c1b7b6d119")) {
    console.log("Invalid Session Token Code")
    return
  }
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
</script>

<template>
  <IonBackdrop :visible="true" :tappable="false" v-if="inProgress"></IonBackdrop>
  <IonItemGroup>
    <template v-if="isPlatform('ios')">
    </template>
    <template v-if="!isPlatform('ios')">
      <IonListHeader lines="none" mode="ios">
        <IonLabel>{{ t("title.labels.nintendo") }}</IonLabel>
      </IonListHeader>
      <IonButton expand="block" @click="authorize">
        <IonLabel slot="start">{{ t("title.labels.login") }}</IonLabel>
      </IonButton>
      <IonItem>
        <IonInput placeholder="リンクのアドレスを貼り付けてください" v-model="session_token_code" type="password" @ionChange="signIn">
        </IonInput>
      </IonItem>
      <IonItem>
        <IonText>
          ログインボタンを押すと任天堂のログインページが表示されるので、ログイン後に「この人にする」を右クリックして「リンクのアドレスをコピー」を選択します。その後、このページに戻ってリンクのページを貼り付けます。貼り付けが終わると自動的にログインが始まります。スマートフォンでの詳しいログインの方法は「<a
            :href="videoURL">ログイン方法について</a>」を参考にしてください。
        </IonText>
      </IonItem>
    </template>
  </IonItemGroup>
</template>

<style lang="scss" scoped>
ion-backdrop {
  opacity: 0.3;
}

ion-button {
  margin: 0 10px;
}

ion-icon {
  size: 64px !important;
}
</style>
