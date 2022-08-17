<script setup lang="ts">
import { IonContent, IonList, modalController, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, getPlatforms, isPlatform } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { logoTwitter } from 'ionicons/icons';
import { getAuth, signInWithPopup, TwitterAuthProvider, UserCredential, UserInfo } from 'firebase/auth';
import { toastController } from '@ionic/core';

const { t, availableLocales, locale } = useI18n()

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

// モーダルを閉じる
async function signIn() {
  try {
    const provider = new TwitterAuthProvider();
    const auth = getAuth()
    const user = new Twitter(await signInWithPopup(auth, provider))
    console.log(user)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <IonButton @click="signIn">
    <IonIcon :icon="logoTwitter" slot="icon-only"></IonIcon>
  </IonButton>
</template>
