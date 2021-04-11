<template>
  <q-page-sticky
    style="index: 100"
    v-if="!$q.screen.gt.sm && !loading"
    position="bottom-right"
    :offset="cordovaOffset()"
    @click="$emit('mode-create')"
  >
    <q-btn fab icon="add" size="lg" color="stale" />
  </q-page-sticky>
</template>

<script>
export default {
  props: {
    loading: Boolean
  },

  methods: {
    cordovaOffset() {
      if (this.$q.platform.is.cordova) {
        return [25, 25];
      } else {
        return [25, 55];
      }
    }
  }
};
</script>
