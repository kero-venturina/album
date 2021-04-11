<template>
  <q-dialog loading :value="dialog" persistent>
    <q-card>
      <q-card-section style="max-width: 390px">
        <div class="text-h6 text-center">Delete</div>
        <div class="text-body-2 q-mt-sm">
          <span class="text-weight-bold">Note: </span>
          You won't be able to revert this action once commited. Make up your
          decision.
        </div>
        <div class="text-body-2 q-mt-sm">
          Are you sure you want to delete this item?
        </div>
      </q-card-section>

      <div class="row text-center q-pa-md">
        <div class="block-button q-pr-md" @click="$emit('handle-delete')">
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
  props: {
    dialog: Boolean,
    document: Object
  },

  data: () => ({
    loading: false
  })
};
</script>
