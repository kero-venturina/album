<template>
  <q-card :style="getResponsiveStyle()" class="card-photo shadow-5">
    <q-skeleton
      height="300px"
      square
      class="clickable"
      animation="none"
      @click="$emit('handle-click')"
    />

    <q-card-section
      style="height: 100px;"
      class="text-left clickable"
      @click="$emit('handle-click')"
    >
      <div class="text-subtitle2">
        {{ title }}
      </div>
      <div class="text-caption">
        <span v-if="caption">
          {{ caption }}
        </span>
        <span v-else>
          Insert inspiring caption here.
        </span>
      </div>
    </q-card-section>

    <!-- extra menu -->
    <q-btn
      v-if="menu"
      round
      unelevated
      :ripple="false"
      class="absolute-top q-ml-auto q-ma-sm"
    >
      <q-icon name="more_horiz"></q-icon>

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
                Delete album
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
    caption: String,
    menu: { type: Boolean, default: false }
  },

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
