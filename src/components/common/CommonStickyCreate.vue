<template>
  <q-page-sticky
    style="index: 1000"
    v-if="!$q.screen.gt.sm"
    position="bottom-right"
    :offset="[25, 25]"
    @click="$emit('handle-click')"
  >
    <q-btn fab icon="add" size="lg" color="dark" />
  </q-page-sticky>
</template>
