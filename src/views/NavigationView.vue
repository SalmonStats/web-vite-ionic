<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { earthOutline, pieChartOutline, trailSignOutline, personOutline, searchOutline } from 'ionicons/icons';
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="results" href="/">
          <IonIcon :icon="earthOutline" />
          <IonLabel>Results</IonLabel>
        </IonTabButton>

        <IonTabButton tab="schedules" href="/schedules">
          <IonIcon :icon="trailSignOutline" />
          <IonLabel>Schedules</IonLabel>
        </IonTabButton>

        <IonTabButton tab="charts" href="/charts">
          <IonIcon :icon="pieChartOutline" />
          <IonLabel>Charts</IonLabel>
        </IonTabButton>

        <IonTabButton tab="search" href="/search">
          <IonIcon :icon="searchOutline" />
          <IonLabel>Search</IonLabel>
        </IonTabButton>

        <IonTabButton tab="users" href="/users">
          <IonIcon :icon="personOutline" />
          <IonLabel>User</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
