<script setup lang="ts">
import {
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonBackdrop,
} from '@ionic/vue';
interface Props {
  visible: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <slot v-if="visible" />
  <Transition>
    <IonBackdrop :visible="true" :tappable="false" :stop-propagation="true" v-if="!visible">
    </IonBackdrop>
  </Transition>
</template>

<style scoped>
ion-backdrop {
  background-color: gray;
  opacity: 0.2;
}

ion-spinner {
  width: 40px;
  height: 40px;
  top: 50%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
