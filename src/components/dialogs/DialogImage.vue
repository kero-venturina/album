<template>
  <div
    v-if="dialog"
    style="overflow: auto;"
    class="fullscreen bg-dark text-dark text-center q-pa-lg flex animate__animated animate__fadeIn"
    :class="{ 'flex-center': $q.screen.gt.sm }"
  >
    <!-- close dialog button -->
    <q-btn
      color="grey-1"
      round
      @click="$emit('close-dialog')"
      class="absolute-top q-ml-auto q-ma-md"
    >
      <q-icon name="close" class="text-dark" />
    </q-btn>

    <!-- content image -->
    <q-card
      flat
      class="q-mx-auto bg-dark"
      :class="{ 'q-mt-xl': !$q.screen.gt.sm }"
    >
      <div class="absolute-top text-h6 text-white text-center q-pt-md q-px-md">
        {{ title }}
      </div>
      <img :src="imageUrl" style="max-height: 600px; max-width: 600px" />
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    title: String,
    imageUrl: String
  }
};
</script>
