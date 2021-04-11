<template>
  <div id="q-app" class="bg-waves">
    <q-layout view="lHh lpR fff">
      <app-header />
      <q-page-container>
        <router-view />
      </q-page-container>
      <app-footer />
    </q-layout>
  </div>
</template>
<script>
import AppHeader from "src/components/app/AppHeader.vue";
import AppFooter from "src/components/app/AppFooter.vue";

export default {
  name: "App",
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter
  }
};
</script>
