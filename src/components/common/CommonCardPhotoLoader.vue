<template>
  <q-card square bordered flat style="width: 150px">
    <q-skeleton height="150px" square />
  </q-card>
</template>

<script>
export default {
  methods: {
    getResponsiveStyle() {
      if (this.$q.screen.gt.xs) {
        return;
      } else {
        return "width: 100%";
      }
    }
  }
};
</script>
