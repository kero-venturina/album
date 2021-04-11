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
            <q-breadcrumbs>
              <q-breadcrumbs-el
                :label="album.title"
                @click="routeProfile()"
                class="clickable"
              />
              <q-breadcrumbs-el label="Photos" />
            </q-breadcrumbs>
          </div>
          <div class="text-h6 q-ml-auto" v-if="$q.screen.gt.sm">
            <q-btn
              flat
              no-caps
              rounded
              class="text-weight-bold text-azure"
              label="Upload/Add photo"
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
          placeholder="Search photo here .."
          @input="$emit('input-search', $event)"
          @keyup.enter="$emit('refresh-documents')"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- content -->
        <div
          v-if="filteredPhotos.length > 0 || loading"
          class="q-mx-auto row q-gutter-sm text-center q-pr-sm q-mt-xs q-mb-xl flex-center"
        >
          <template v-if="!loading">
            <common-card-photo
              v-for="(photo, index) in filteredPhotos"
              :key="index"
              :menu="true"
              :title="photo.title"
              :thumbnailUrl="photo.thumbnailUrl"
              :imageUrl="photo.thumbnailUrl"
              @handle-update="modeUpdate(photo)"
              @handle-delete="modeDelete(photo)"
              @handle-click="modeShowImage(photo)"
            />
          </template>

          <template v-if="loading">
            <common-card-photo-loader v-for="n in 40" :key="`${n}-loader`" />
          </template>
        </div>

        <!-- empty content -->
        <common-empty-results
          subject="photo"
          :documentLength="filteredPhotos.length"
          :loading="loading"
          :search="search"
          @handle-create="modeCreate()"
        />
      </q-card>
    </div>

    <!-- dialogs and forms -->
    <common-sticky-create @handle-click="modeCreate()" />

    <form-photo
      :dialog="dialog.form"
      :document="temp"
      @handle-update="updateElement($event)"
      @handle-create="createElement($event)"
      @close-dialog="dialog.form = false"
    />

    <dialog-image
      :dialog="dialog.image"
      :imageUrl="temp.imageUrl"
      :title="temp.title"
      @close-dialog="dialog.image = false"
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
import CommonCardPhoto from "src/components/common/CommonCardPhoto.vue";
import CommonCardPhotoLoader from "src/components/common/CommonCardPhotoLoader.vue";

export default {
  components: {
    "common-card-photo": CommonCardPhoto,
    "common-card-photo-loader": CommonCardPhotoLoader,
    // on demand components
    "common-empty-results": () =>
      import("components/common/CommonEmptyResults"),
    "common-sticky-create": () =>
      import("components/common/CommonStickyCreate"),
    "common-user-title": () => import("components/common/CommonUserTitle"),
    "form-photo": () => import("components/forms/FormPhoto"),
    "dialog-image": () => import("components/dialogs/DialogImage"),
    "dialog-delete": () => import("components/dialogs/DialogDelete")
  },

  props: ["propsUserObject", "propsAlbumObject"],

  data: () => ({
    search: "",
    user: {},
    album: {},
    photos: [],
    loading: false,
    dialog: {
      image: false,
      form: false,
      delete: false
    },

    temp: {
      id: "",
      title: "",
      imageUrl: ""
    }
  }),

  mounted() {
    // must check if props is available
    if (this.propsUserObject) {
      this.user = this.propsUserObject;
    }
    this.album = this.propsAlbumObject;
    this.handleRequestPhotos();
  },

  methods: {
    async handleRequestPhotos() {
      // simulate loading
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1500);

      // get request to server
      await axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/photos?albumId=${this.album.id}`
      })
        .then(response => {
          this.photos = response.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /*
      Mode for dialogs, passing data of photo
      to dialog stored in temporary variable
    */
    modeCreate() {
      this.temp.method = "post";
      if (this.search && this.filteredPhotos.length == 0) {
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

    modeShowImage(event) {
      this.temp.imageUrl = event.url;
      this.temp.title = event.title;
      this.dialog.image = true;
    },

    /*
      Handle CRUD for front-end no backend involve
    */
    async createElement(event) {
      // simulate loading
      this.$q.loading.show({ message: "Creating album. Please wait." });
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);

      // push new album
      this.photos.push({
        title: event.title,
        thumbnailUrl: event.thumbnailUrl,
        url: event.imageUrl,
        albumId: this.album.id,
        id: require("crypto")
          .randomBytes(8)
          .toString("hex")
      });

      // alert message
      this.dialog.form = false;
      this.$q.notify({
        message: "New album added",
        caption: `${event.title} was created.`,
        icon: "info"
      });
      this.$q.loading.hide();
    },

    async updateElement(event) {
      // simulate loading
      this.$q.loading.show({ message: "Updating album. Please wait." });
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);

      // update item in array
      for (let i = 0; i < this.photos.length; i++) {
        if (this.temp.id == this.photos[i].id) {
          const name = this.photos[i].title;
          this.photos[i].title = event.title;
          this.dialog.form = false;

          // alert message
          this.$q.notify({
            message: "Album update",
            caption: `${name} was updated.`,
            icon: "info"
          });
          break;
        }
      }

      this.$q.loading.hide();
    },

    async deleteElement() {
      // simulate loading
      this.$q.loading.show({ message: "Deleting photo. Please wait." });
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);

      // delete item in array
      this.dialog.delete = false;
      for (let i = 0; i < this.photos.length; i++) {
        if (this.temp.id == this.photos[i].id) {
          const name = this.photos[i].title;
          this.photos.splice(i, 1);

          // alert message
          this.$q.notify({
            message: "Photo deleted",
            caption: `${name} was deleted.`,
            icon: "info"
          });
          break;
        }
      }

      this.$q.loading.hide();
    },

    routeProfile() {
      this.$router.push({
        name: "profile",
        params: {
          id: this.user.id,
          slug: this.user.username,
          propsUser: this.user
        }
      });
    }
  },

  // for demo purposes only, filtering data must be done server side.
  computed: {
    filteredPhotos() {
      return this.photos.filter(data => {
        const filteredData = data.title
          .toLowerCase()
          .includes(this.search.toLowerCase().trim());
        if (filteredData) return filteredData;
        if (!this.search) return this.photos;
      });
    }
  }
};
</script>
