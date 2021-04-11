<template>
  <div
    class="border-dashed text-center q-pa-xl q-mt-md text-grey-6 clickable"
    v-if="!loading && documentLength == 0"
    @click="$emit('handle-create')"
  >
    <q-icon name="add" class="text-weight-bolder text-h4"></q-icon>
    <div class="text-h6">
      Create new {{ subject }}
      <div v-if="search" class="text-caption">
        No {{ subject }} found contaning "{{ search }}"
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subject: String,
    search: String,
    documentLength: Number,
    loading: Boolean
  }
};
</script>
