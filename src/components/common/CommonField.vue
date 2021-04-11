<template>
  <q-form ref="form" @submit.prevent>
    <q-input
      :value="document"
      :borderless="borderless"
      :outlined="outlined"
      ref="input"
      :counter="counter"
      :autogrow="autogrow"
      :autofocus="autofocus"
      :maxlength="maxlength"
      standout="bg-grey-1 text-dark"
      bg-color="white"
      color="dark"
      :label="label"
      :hint="hint"
      :hide-hint="hint ? false : true"
      :hide-bottom-space="hint ? false : true"
      :placeholder="placeholder"
      :disable="loading || disable"
      :loading="loading && loader"
      :rules="getRules()"
      @keyup.enter="$emit('handle-submit')"
      @input="$emit('input', $event)"
      @blur="$emit('blur')"
    >
    </q-input>
  </q-form>
</template>

<script>
export default {
  props: {
    document: String,
    autofocus: Boolean,
    rules: Array,
    loader: Boolean,
    loading: Boolean,
    label: String,
    placeholder: String,
    counter: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    autogrow: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      default: "64"
    },
    hint: {
      type: String,
      default: ""
    }
  },

  data: () => ({
    required: value => !!value || "(Required) Fill up this field"
  }),

  methods: {
    getRules() {
      let addRules = [];
      if (this.rules) {
        if (this.rules.includes("required")) {
          addRules.push(this.required);
        }
      }
      return addRules;
    },

    validate() {
      this.$emit("validate");
    }
  },

  watch: {
    model() {
      this.model = this.model.trim().replace(/\s+/g, " ");
      this.$emit("apply-input", this.model);
    }
  }
};
</script>
