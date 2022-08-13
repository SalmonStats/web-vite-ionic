<script setup lang="ts">
import { IonSearchbar, IonList, IonItem, IonLabel, IonAvatar, IonImg, IonIcon } from '@ionic/vue';
import axios, { AxiosError } from 'axios';
import { sparkles } from 'ionicons/icons';
import { Search } from '@/types/salmonstats';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const inputText: Ref<string> = ref<string>("")
const results: Ref<Search[]> = ref<Search[]>([])

async function getPlayers() {
  if (inputText.value.length === 0) {
    return
  }
  const url = `${import.meta.env.VITE_APP_URL}/players`
  const parameters = {
    "offset": 0,
    "limit": 100,
    "nickname": inputText.value
  }
  console.log(`Searching with ${inputText}`)
  results.value = (await axios.get(url, { params: parameters })).data as Search[]
}

// onMounted(() => {
// })
</script>

<template>
  <IonSearchbar @keyup.enter="getPlayers()" v-model="inputText"></IonSearchbar>
  <IonList>
    <template v-for="result in results" :key="result.nsaid+result.nickname">
      <IonItem button :router-link="`/users/${result.nsaid}`">
        <div>
          <section class="coop-player-information">
            <IonAvatar>
              <IonImg :src="result.thumbnail_url"></IonImg>
            </IonAvatar>
            <IonIcon :icon="sparkles" v-if="result.is_imperial_scholars"></IonIcon>
          </section>
          <section>
            <IonLabel class="nsaid">{{ result.nsaid }}</IonLabel>
            <IonLabel>
              {{ result.nickname }}
            </IonLabel>
          </section>
        </div>
      </IonItem>
    </template>
  </IonList>
</template>

<style lang="scss" scoped>
ion-label {
  text-align: right;
}

div {
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
  margin: 0 auto;
}

ion-avatar {
  padding: 4px;
}

ion-img {
  aspect-ratio: 1;
}

section {
  &.coop-player-information {
    display: flex;
  }
}

ion-icon {
  color: #ffd700;
  padding-top: 6px;
}
</style>
