<template>
  <q-card flat square bordered style="width: 150px">
    <q-img
      width="150px"
      :src="thumbnailUrl"
      @click="$emit('handle-click')"
      class="clickable"
    >
      <template v-slot:loading>
        <div class="text-subtitle1 text-white">
          Loading
        </div>
      </template>
    </q-img>

    <q-btn
      v-if="menu"
      round
      unelevated
      :ripple="false"
      class="absolute-top q-ml-auto q-ma-sm"
      style="background: rgba(0,0,0,0.1);"
    >
      <q-icon name="more_horiz" class="text-white"></q-icon>

      <q-menu :offset="[0, 9]">
        <q-list dense class="rounded-borders q-pb-none q-py-none q-pa-sm">
          <q-item
            clickable
            v-ripple
            v-close-popup
            @click="$emit('handle-update')"
          >
            <q-item-section avatar>
              <q-icon name="edit" color="dark" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="text-subtitle2">
                Edit Information
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-close-popup
            @click="$emit('handle-delete')"
          >
            <q-item-section avatar>
              <q-icon name="delete" color="dark" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="text-subtitle2">
                Delete photo
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-card>
</template>

<script>
export default {
  props: {
    title: String,
    thumbnailUrl: String,
    imageUrl: String,
    menu: { type: Boolean, default: false }
  }
};
</script>
