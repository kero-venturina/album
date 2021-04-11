<template>
  <div>
    <div style="max-width: 1440px;" class="q-mx-auto q-mx-md">
      <!-- banner -->
      <div
        class="q-mx-auto q-px-md text-center q-py-xl"
        style="max-width: 720px;"
      >
        <div
          class="text-weight-bolder text-azure text-album"
          :class="[
            { 'text-h1': $q.screen.gt.xs },
            { 'text-h2': !$q.screen.gt.xs }
          ]"
        >
          Let's stalk
          <span class="text-weight-medium text-dark">
            People
          </span>
        </div>
        <div
          class="text-grey-6 q-mt-sm q-mb-md"
          :class="[
            { 'text-h6': $q.screen.gt.xs },
            { 'text-body1 text-weight-medium': !$q.screen.gt.xs }
          ]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          ac convallis libero. Fusce eget pharetra enim.
        </div>
        <q-btn
          no-caps
          color="dark"
          class="q-mt-sm q-px-md q-py-xs text-weight-bold"
          style="border-radius: 8px;"
          @click="$router.push({ name: 'users' })"
        >
          Start stalking now!
        </q-btn>
      </div>

      <!-- content -->
      <div class="text-overline text-center q-pt-md">
        EXPLORE PUBLIC ALBUMS
      </div>

      <q-infinite-scroll @load="handleRequestAlbums" :offset="250">
        <div
          class="q-mx-auto row q-gutter-lg text-center q-pr-lg q-mt-xs q-mb-xl flex-center"
        >
          <template>
            <common-card-album
              v-for="(album, index) in album.list"
              :title="album.title"
              :key="index"
              :caption="`by: ${getUserName(album.userId)}`"
              @handle-click="routePhotos(album)"
            />
          </template>
          <template v-if="loading">
            <common-card-loader v-for="n in 12" :key="`${n}-loader`" />
          </template>
        </div>
      </q-infinite-scroll>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommonCardAlbum from "src/components/common/CommonCardAlbum.vue";
import CommonCardAlbumLoader from "src/components/common/CommonCardAlbumLoader.vue";

export default {
  components: {
    "common-card-album": CommonCardAlbum,
    "common-card-loader": CommonCardAlbumLoader
  },

  data: () => ({
    users: [],
    loading: true,
    album: {
      list: [],
      start: 0,
      last: 0
    }
  }),

  mounted() {
    this.handleRequestAlbums();
    this.handleRequestUsers();
  },

  methods: {
    async handleRequestAlbums(index, done) {
      // simulate loader
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);

      // request data to server
      await axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/albums?_start=${this.album.start}&_limit=32`
      })
        .then(response => {
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              this.album.list.push(response.data[i]);
            }
            if (done) done();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          this.album.start = parseInt(this.album.start) + 32;
        });
    },

    async handleRequestUsers() {
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
        });
    },

    routePhotos(event) {
      this.$router.push({
        name: "album",
        params: {
          id: event.id,
          slug: event.title.replace(/\s+/g, "-").toLowerCase(),
          propsAlbum: event
        }
      });
    },

    /*
      Note: this method is for design purposes only, backend server should be
      populatating foreign field for user.
    */
    getUserName(paramUserId) {
      for (let i = 0; i < this.users.length; i++) {
        const element = this.users[i];
        if (element.id == paramUserId) {
          return element.name;
        }
      }
    }
  }
};
</script>
