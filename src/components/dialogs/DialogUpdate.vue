<template>
  <q-dialog loading :value="dialog" persistent>
    <q-card>
      <q-card-section style="max-width: 390px">
        <div class="text-h6 text-center">
          <span v-if="document.post">New Album</span>
          <span v-else>Change title</span>
        </div>
        <div class="text-body-2 q-mt-sm">
          Add alternative text that describes the contents of the photo for
          people with visual impairments.
        </div>
        <div>
          <common-field
            label="New title"
            class="q-mt-md"
            maxlength="48"
            counter
            hint="(Required) Alphanumeric only."
            :loading="loading"
            :document="form.title"
            @input="form.title = $event"
            @focus="$event.target.select()"
            @handle-submit="handleSubmit()"
          />
        </div>
      </q-card-section>

      <div class="row text-center q-pa-md">
        <div class="block-button q-pr-md" @click="handleSubmit()">
          <q-btn class="w-100" :ripple="false" no-caps color="dark">
            Confirm
          </q-btn>
        </div>
        <div class="block-button ml-auto" @click="$emit('close-dialog')">
          <q-btn flat unelevated :ripple="false" no-caps class="w-100">
            Cancel
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  components: {
    "common-field": () => import("components/common/CommonField")
  },

  props: {
    dialog: Boolean,
    document: Object
  },

  data: () => ({
    loading: false,
    form: {
      title: ""
    }
  }),

  methods: {
    handleSubmit() {
      this.loading = true;
      this.$emit("handle-submit", this.form);
      this.loading = false;
    }
  },

  watch: {
    dialog() {
      if (this.dialog) {
        this.form.title = this.document.title;
      }
    }
  }
};
</script>
