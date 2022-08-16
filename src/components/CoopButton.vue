<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon, toastController, IonBackdrop } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { syncOutline } from 'ionicons/icons';
import { SplatNet2 } from '@/types/common';
import axios from 'axios';
import dayjs from 'dayjs';

const { t } = useI18n()

interface Props {
  account: SplatNet2
}
interface Emits {
  (e: 'updated', value: SplatNet2): void;
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()

Array.prototype.sum = function () {
  const items = this as number[];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, num) => sum + num, 0);
};

// セッショントークンが切れていたときに実行する
async function authorize(session_token: string): Promise<SplatNet2> {
  const url = `${import.meta.env.VITE_APP_URL}/authorize/`
  const parameters = {
    'session_token': session_token
  }

  const account = (await axios.post(url, parameters)).data as SplatNet2
  // アカウントの更新を通知する
  emit('updated', account)
  return account
}

async function getResults() {
  const session_token: string = props.account.session_token
  try {
    console.log("Credentials: Expiration", props.account.expires_in, dayjs.unix(props.account.expires_in).toISOString())
    console.log("Credentials: NsaId", props.account.nsaid)
    console.log("Credentials: Token", props.account.iksm_session)
    console.log("Getting Results...")
    // 有効期限が切れていたら再生成する
    if (props.account.expires_in <= dayjs().unix() + 3600) {
      const { iksm_session } = await authorize(session_token)
      console.log("New Session Token", iksm_session)
    }

    const url = `${import.meta.env.VITE_APP_URL}/authorize/results`
    const parameters = {
      iksm_session: props.account.iksm_session,
      result_id: 1,
      nsaid: props.account.nsaid
    }
    axios.post(url, parameters)
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
  <IonBackdrop :tappable="false" :visible="true" :stop-propagation="false"></IonBackdrop>
  <IonFab vertical="bottom" horizontal="end">
    <IonFabButton :icon="syncOutline" @click="getResults">
      <IonIcon :icon="syncOutline" size="large"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<style lang="scss" scoped>
</style>
