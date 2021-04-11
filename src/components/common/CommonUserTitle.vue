<template>
  <div>
    <div>
      <q-avatar :size="getResponsiveSize()" color="dark" text-color="white">
        {{ getFirstLetterOfName() }}
      </q-avatar>
    </div>
    <div
      class="text-center q-mt-md"
      :class="[{ 'text-h2': $q.screen.gt.xs }, { 'text-h4': !$q.screen.gt.xs }]"
    >
      {{ name }}
    </div>
    <div
      class="text-grey-6 q-mb-lg"
      :class="[
        { 'text-h6': $q.screen.gt.xs },
        { 'text-body1': !$q.screen.gt.xs }
      ]"
    >
      {{ email }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    email: String
  },

  methods: {
    getFirstLetterOfName() {
      return "S";
    },

    getResponsiveSize() {
      if (this.$q.screen.gt.xs) {
        return "100px";
      } else {
        return "80px";
      }
    }
  }
};
</script>
