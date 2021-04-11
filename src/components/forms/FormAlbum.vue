<template>
  <q-dialog loading :value="dialog" persistent>
    <q-card>
      <q-card-section style="max-width: 390px">
        <!-- title -->
        <div class="text-h6 text-center">
          <span v-if="document.method == 'patch'">Change title</span>
          <span v-else>New Album</span>
        </div>
        <div class="text-body-2 q-mt-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          ac convallis libero.
        </div>

        <!-- form -->
        <div>
          <q-form ref="form" @submit.prevent>
            <common-field
              label="New title"
              class="q-mt-md"
              maxlength="48"
              counter
              hint="(Required) Title of your album e.g. Sexy Album etc."
              :loading="loading"
              :document="form.title"
              :rules="['required']"
              @input="form.title = $event"
              @focus="$event.target.select()"
              @handle-submit="handleSubmit()"
            />
          </q-form>
        </div>
      </q-card-section>

      <!-- footer buttons -->
      <div class="row text-center q-pa-md">
        <div class="block-button q-pr-md" @click="handleSubmit()">
          <q-btn class="w-100" :ripple="false" no-caps color="dark">
            Submit
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
      this.$refs.form.validate().then(success => {
        if (success) {
          switch (this.document.method) {
            case "post":
              this.$emit("handle-create", this.form);
              break;

            case "patch":
              this.$emit("handle-update", this.form);
              break;
          }
        } else {
          this.$q.notify({
            message: `Submit failed.`,
            caption: "Please correct the following fields."
          });
        }
      });
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
