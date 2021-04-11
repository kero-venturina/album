<template>
  <div class="q-pb-xl q-pt-lg">
    <div
      style="max-width: 1440px;"
      class="q-mx-auto q-px-md text-center q-mx-md"
    >
      <common-user-title :name="user.name" :email="user.email" />

      <q-card flat bordered class="q-pa-lg q-mb-md text-left">
        <!-- content header -->
        <div class="row">
          <div class="text-h6">
            My albums
          </div>
          <div class="text-h6 q-ml-auto" v-if="$q.screen.gt.sm">
            <q-btn
              flat
              no-caps
              rounded
              class="text-weight-bold text-azure"
              label="Add new album"
              :ripple="false"
              @click="modeCreate()"
            />
          </div>
        </div>

        <!-- content search -->
        <q-input
          v-model="search"
          :disable="loading"
          borderless
          dense
          color="dark"
          placeholder="Search album here .."
          @input="$emit('input-search', $event)"
          @keyup.enter="$emit('refresh-documents')"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- content albums -->
        <div
          v-if="filteredAlbums.length > 0 || loading"
          class="q-mx-auto row q-gutter-lg text-center q-pr-lg q-mt-xs q-mb-xl flex-center"
        >
          <template v-if="!loading">
            <common-card-album
              v-for="(album, index) in filteredAlbums"
              :title="album.title"
              :menu="true"
              :key="index"
              @handle-click="routePhotos(album)"
              @handle-update="modeUpdate(album)"
              @handle-delete="modeDelete(album)"
            />
          </template>

          <template v-if="loading">
            <common-card-loader v-for="n in 12" :key="n" />
          </template>
        </div>

        <!-- empty content -->
        <common-empty-results
          subject="album"
          :documentLength="filteredAlbums.length"
          :loading="loading"
          :search="search"
          @handle-create="modeCreate()"
        />
      </q-card>
    </div>

    <!-- dialogs and forms -->
    <common-sticky-create @handle-click="modeCreate()" />

    <form-album
      :dialog="dialog.form"
      :document="temp"
      @handle-update="updateElement($event)"
      @handle-create="createElement($event)"
      @close-dialog="dialog.form = false"
    />

    <dialog-delete
      :dialog="dialog.delete"
      @handle-delete="deleteElement()"
      @close-dialog="dialog.delete = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import CommonCardAlbum from "src/components/common/CommonCardAlbum.vue";
import CommonCardAlbumLoader from "src/components/common/CommonCardAlbumLoader.vue";

export default {
  components: {
    "common-card-album": CommonCardAlbum,
    "common-card-loader": CommonCardAlbumLoader,
    // on demand components
    "common-empty-results": () =>
      import("components/common/CommonEmptyResults"),
    "common-sticky-create": () =>
      import("components/common/CommonStickyCreate"),
    "common-user-title": () => import("components/common/CommonUserTitle"),
    "form-album": () => import("components/forms/FormAlbum"),
    "dialog-delete": () => import("components/dialogs/DialogDelete")
  },

  props: ["propsUser"],

  data: () => ({
    search: "",
    user: {},
    albums: [],
    loading: false,

    // for dialog forms post/patch = create/update
    temp: {
      id: "",
      name: "",
      method: "post"
    },

    dialog: {
      delete: false,
      update: false,
      form: false
    }
  }),

  // only for page onload, ignore if props is available
  mounted() {
    // check if props is available
    if (this.propsUser) {
      this.user = this.propsUser;

      // get request params
    } else {
      this.user = this.$route.params.slug; // username
    }

    // request album
    this.handleRequestAlbums();
  },

  methods: {
    getFirstLetterOfName() {
      if (this.user.name) {
        return this.user.name.substr(0, 1);
      }
    },

    routePhotos(event) {
      this.$router.push({
        name: "photo",
        params: {
          id: event.id,
          slugUser: this.user.username,
          slug: event.title.replace(/\s+/g, "-").toLowerCase(),
          propsUserObject: this.user,
          propsAlbumObject: event
        }
      });
    },

    async handleRequestAlbums() {
      // simulate loading
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));

      await delay(1500);
      // get request to server
      await axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/albums?userId=${this.user.id}`
      })
        .then(response => {
          this.albums = response.data;
          console.log(this.albums);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /*
      Mode for dialogs, passing data of album
      to dialog stored in temporary variable
    */

    modeCreate() {
      this.temp.method = "post";
      if (this.search && this.filteredAlbums.length == 0) {
        this.temp.title = this.search;
      } else {
        this.temp.title = "";
      }
      this.dialog.form = true;
    },

    modeUpdate(event) {
      this.temp.id = event.id;
      this.temp.title = event.title;
      this.temp.method = "patch";
      this.dialog.form = true;
    },

    modeDelete(event) {
      this.temp.id = event.id;
      this.temp.title = event.title;
      this.dialog.delete = true;
    },

    /*
      Handle CRUD for front-end no backend involve
    */
    async createElement(event) {
      // simulate loading
      this.loading = true;
      this.dialog.form = false;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);

      // push new album
      this.albums.push({
        title: event.title,
        userId: this.user,
        id: require("crypto")
          .randomBytes(8)
          .toString("hex")
      });

      // alert message
      this.$q.notify({
        message: "New album added",
        caption: `${event.title} was created.`,
        icon: "info"
      });

      this.loading = false;
      this.$q.loading.hide();
    },

    async updateElement(event) {
      // simulate loading
      this.loading = true;
      this.dialog.form = false;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);

      // update item in array
      for (let i = 0; i < this.albums.length; i++) {
        if (this.temp.id == this.albums[i].id) {
          const name = this.albums[i].title;
          this.albums[i].title = event.title;

          // alert message
          this.$q.notify({
            message: "Album update",
            caption: `${name} was updated.`,
            icon: "info"
          });
          break;
        }
      }

      this.loading = false;
    },

    async deleteElement() {
      // simulate loading
      this.dialog.delete = false;
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);

      // delete item in array
      for (let i = 0; i < this.albums.length; i++) {
        if (this.temp.id == this.albums[i].id) {
          const name = this.albums[i].title;
          this.albums.splice(i, 1);

          // alert message
          this.$q.notify({
            message: "Album deleted",
            caption: `${name} was deleted.`,
            icon: "info"
          });
          break;
        }
      }

      this.loading = false;
    }
  },

  // for demo purposes only, filtering data must be done server side.
  computed: {
    filteredAlbums() {
      return this.albums.filter(data => {
        const filteredData = data.title
          .toLowerCase()
          .includes(this.search.toLowerCase().trim());
        if (filteredData) return filteredData;
        if (!this.search) return this.albums;
      });
    }
  }
};
</script>
