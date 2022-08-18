<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonText, IonSelect, IonSelectOption, onIonViewDidEnter } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { getAuth, signInWithPopup, TwitterAuthProvider, UserCredential, UserInfo } from 'firebase/auth';
import { onMounted, ref, Ref } from 'vue';
import { SplatNet2 } from '@/types/common';

const { t, availableLocales, locale } = useI18n()
const accounts: Ref<Account[]> = ref<Account[]>([])
const account: Ref<SplatNet2> = ref<SplatNet2>((() => {
  return JSON.parse(localStorage.getItem('account') ?? "{}") as SplatNet2
})())

interface Account {
  nsaid: string
  nickname: string
  thumbnail_url: string
  friend_code: string
}

class Twitter {
  constructor(credential: UserCredential) {
    const user: UserInfo = credential.user.providerData[0]
    this.uid = user.uid
    this.display_name = user.displayName
    this.thumbnail_url = user.photoURL
    this.screen_name = ""
    this.accounts = []
  }
  screen_name: string
  display_name: string | null
  thumbnail_url: string | null
  uid: string
  accounts: Account[]
}

interface User {
  uid: string
  name: string
  is_friend_code_public: boolean
  is_imperial_scholars: boolean
  is_twitter_id_public: boolean
  is_verified: boolean
  thumbnail_url: string
  accounts: Account[]
}

// モーダルを閉じる
async function signIn() {
  try {
    const provider = new TwitterAuthProvider();
    const auth = getAuth()
    // Twitterで連携したアカウントの表示
    const user = new Twitter(await signInWithPopup(auth, provider))
    // 連携しているTwitterアカウントをSalmon Statsから検索する
    const url: string = `${import.meta.env.VITE_APP_URL}/users`
    const parameters = JSON.stringify(user)
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const accounts: SplatNet2[] = (await (await fetch(url, {
      method: "POST",
      headers: headers,
      body: parameters
    })).json()).accounts.map((account: SplatNet2) => account as SplatNet2)
    // 仮データを保存(将来的にフォーマットを統一したい)
    localStorage.setItem("salmon_stats_accounts", JSON.stringify(accounts))
  } catch (error) {
  }
}

function changedAccount(event: CustomEvent) {
  const nsaid: string = event.detail.value
  account.value = {
    nickname: '',
    nsaid: nsaid,
    session_token: '',
    iksm_session: '',
    thumbnail_url: '',
    expires_in: 0,
    friend_code: '',
    summary: {
      golden_ikura_total: 0,
      ikura_total: 0,
      help_total: 0,
      job_num: 0,
      kuma_point: 0,
      kuma_point_total: 0,
    }
  } as SplatNet2
  localStorage.setItem('account', JSON.stringify(account.value))
}

onMounted(() => {
  // ローカルからアカウント情報を読み込む
  accounts.value = JSON.parse(localStorage.getItem("salmon_stats_accounts") ?? "[]") as Account[]
})
</script>

<template>
  <IonListHeader lines="none" mode="ios">
    <IonLabel>{{ t("title.labels.twitter") }}</IonLabel>
  </IonListHeader>
  <IonButton expand="block" @click="signIn">
    <IonLabel>Twitter連携</IonLabel>
  </IonButton>
  <IonItem>
    <IonText>事前にSalmonia3でTwitter連携したアカウントでログインする必要があります。</IonText>
  </IonItem>
  <IonItem v-if="accounts.length !== 0">
    <IonLabel>アカウント一覧</IonLabel>
    <IonSelect interface="action-sheet" @ion-change="changedAccount" :value="account.nsaid">
      <template v-for="account in accounts">
        <IonSelectOption :value="account.nsaid">{{ account.nickname }}</IonSelectOption>
      </template>
    </IonSelect>

  </IonItem>
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
