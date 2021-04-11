<template>
  <div class="q-pb-xl q-pt-md">
    <div
      style="max-width: 1080px;"
      class="q-mx-auto q-px-md text-center q-mx-md"
    >
      <!-- title -->
      <div
        class="text-h2 text-left q-mb-md"
        :class="[
          { 'text-h2': $q.screen.gt.xs },
          { 'text-h4': !$q.screen.gt.xs }
        ]"
      >
        Find users
      </div>

      <!-- search -->
      <q-input
        v-model="search"
        borderless
        dense
        :disable="loading"
        color="dark"
        placeholder="Search user here .."
        class="q-mb-md"
        @input="$emit('input-search', $event)"
        @keyup.enter="$emit('refresh-documents')"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- content -->
      <template v-if="!loading">
        <q-card
          v-for="(user, index) in filteredUsers"
          :key="index"
          class="q-mb-md q-pa-md shadow-3 clickable card-photo"
          @click="routeProfile(user)"
        >
          <div class="row text-left">
            <div class="q-my-auto q-mr-md">
              <q-avatar size="32px" color="dark" text-color="white">
                {{ user.name.substr(0, 1) }}
              </q-avatar>
            </div>
            <div class="q-my-auto">
              <div
                class="text-weight-medium text-dark"
                :class="[
                  { 'text-body1': $q.screen.gt.xs },
                  { 'text-body2': !$q.screen.gt.xs }
                ]"
              >
                {{ user.name }} ({{ user.username }})
              </div>
              <div class="caption text-grey-6">
                {{ user.email }}
              </div>
            </div>
          </div>
        </q-card>
      </template>

      <!-- loader -->
      <template v-if="loading">
        <q-card
          v-for="n in 10"
          :key="`${n}-loader`"
          class="q-mb-md q-pa-md shadow-3 text-left"
        >
          <div class="row text-left">
            <div class="q-my-auto q-mr-md">
              <q-skeleton type="QAvatar" />
            </div>
            <div class="q-my-auto">
              <div class="text-body1 text-weight-medium text-dark">
                <q-skeleton width="200px" type="text" />
              </div>
              <div class="caption text-grey-6">
                <q-skeleton width="90px" type="text" />
              </div>
            </div>
          </div>
        </q-card>
      </template>

      <!-- footer -->
      <div v-if="!loading" class="text-grey-6">
        Results found {{ filteredUsers.length }}
        <div v-if="search">containing "{{ search }}"</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    users: [],
    loading: false
  }),

  mounted() {
    this.handleRequestData();
  },

  methods: {
    async handleRequestData() {
      // simulate loading
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1500);

      // request data to server
      await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/users"
      })
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    routeProfile(event) {
      this.$router.push({
        name: "profile",
        params: {
          id: event.id,
          slug: event.username,
          propsUser: event
        }
      });
    }
  },

  // for demo purposes only, filtering data must be done server side.
  computed: {
    filteredUsers() {
      return this.users.filter(data => {
        const filteredData =
          data.name.toLowerCase().includes(this.search.toLowerCase().trim()) ||
          data.email.toLowerCase().includes(this.search.toLowerCase().trim()) ||
          data.username
            .toLowerCase()
            .includes(this.search.toLowerCase().trim());

        if (filteredData) return filteredData;
        if (!this.search) return this.users;
      });
    }
  }
};
</script>
