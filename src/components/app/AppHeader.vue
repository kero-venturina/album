<template>
  <q-header
    bordered
    :class="[
      { 'bg-white ': windowTop > 0 },
      { 'transparent ': windowTop == 0 }
    ]"
    class="text-dark q-py-sm"
    :style="transparentNav()"
  >
    <q-toolbar class="q-mx-auto" style="max-width: 1440px;">
      <!-- branding -->
      <q-toolbar-title class="clickable q-mx-lg" to="/index">
        <div class="text-album text-dark text-weight-bold text-h4 q-mt-sm">
          <span @click="goTo('index')">
            Album
          </span>
        </div>
      </q-toolbar-title>

      <!-- menu / collapse if many -->
      <div>
        <q-btn
          dense
          outline
          no-caps
          flat
          rounded
          :ripple="false"
          color="dark"
          class="text-weight-bold q-py-xs q-px-md"
          @click="goTo('users')"
          label="Discover people"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  data: () => ({
    windowTop: 0
  }),

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    goTo(route) {
      if (this.$route.name != route) {
        this.$router.push({ name: route });
      }
    },

    onScroll(e) {
      this.windowTop = e.target.documentElement.scrollTop;
    },

    transparentNav() {
      if (this.windowTop > 0) {
        return "background: rgba(255, 255, 255, .9)!important;";
      }
    }
  }
};
</script>
