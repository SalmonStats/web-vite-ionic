<script setup lang="ts">
import { IonItem, IonLabel, IonImg, IonFab, IonFabButton, IonIcon, toastController } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { syncOutline } from 'ionicons/icons';
import { SplatNet2 } from '@/types/common';
import { bossURL } from '@/functions';
import axios from 'axios';

const { t } = useI18n()

const props = defineProps<{
  account: SplatNet2
}>()

Array.prototype.sum = function () {
  const items = this as number[];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, num) => sum + num, 0);
};

async function authorize(session_token: string): Promise<string> {
  const url = `${import.meta.env.VITE_APP_URL}/authorize/`
  const parameters = {
    'session_token': session_token
  }

  const { iksm_session } = (await axios.post(url, parameters)).data as SplatNet2
  console.log(iksm_session)
  return iksm_session
}

async function getResults() {
  const session_token: string = props.account.session_token
  console.log("Get Results", session_token)
  try {
    const toast = await toastController
      .create({
        message: "リザルト取得中",
        duration: 2000
      })
    return toast.present()
  } catch (error) {

  }
}
</script>

<template>
  <IonFab vertical="bottom" horizontal="end">
    <IonFabButton :icon="syncOutline" @click="getResults">
      <IonIcon :icon="syncOutline" size="large"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<style lang="scss" scoped>
</style>
