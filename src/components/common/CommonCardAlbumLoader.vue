<template>
  <q-card :style="getResponsiveStyle()">
    <q-skeleton height="400px" square />
  </q-card>
</template>

<script>
export default {
  methods: {
    getResponsiveStyle() {
      if (this.$q.screen.gt.xs) {
        return "width: 300px";
      } else {
        return "width: 100%";
      }
    }
  }
};
</script>
