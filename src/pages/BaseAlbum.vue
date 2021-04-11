<template>
  <div class="q-pb-xl q-pt-md">
    <div
      style="max-width: 1080px;"
      class="q-mx-auto  q-px-md text-center q-mx-md"
    >
      <!-- header -->
      <div class=" q-pb-lg">
        <div class="text-h4 text-center q-pt-lg">
          {{ album.title }}
        </div>
      </div>

      <!-- content -->
      <div
        class="q-mx-auto row q-gutter-sm text-center q-pr-sm q-mt-xs q-mb-xl flex-center"
      >
        <template v-if="!loading">
          <common-card-photo
            v-for="(photo, index) in photos"
            :key="index"
            :title="photo.title"
            :thumbnailUrl="photo.thumbnailUrl"
            :imageUrl="photo.thumbnailUrl"
            @handle-click="modeShowImage(photo)"
          />
        </template>

        <template v-if="loading">
          <common-card-photo-loader v-for="n in 40" :key="`${n}-loader`" />
        </template>
      </div>
    </div>

    <!-- dialogs -->
    <dialog-image
      :dialog="dialog.image"
      :imageUrl="temp.imageUrl"
      :title="temp.title"
      @close-dialog="dialog.image = false"
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
    "dialog-image": () => import("components/dialogs/DialogImage")
  },

  props: ["propsAlbum"],

  data: () => ({
    photos: [],
    loading: false,
    temp: { imageUrl: "", title: "" },
    dialog: { image: false },
    album: {}
  }),

  mounted() {
    if (!this.propsAlbum) {
      this.album.id = this.$route.params.id;
      this.album.title = this.$route.params.slug;
    } else {
      this.album = this.propsAlbum;
    }
    this.handleRequestData();
  },

  methods: {
    modeShowImage(event) {
      this.temp.imageUrl = event.url;
      this.temp.title = event.title;
      this.dialog.image = true;
    },

    // get album
    async handleRequestData() {
      // simulate loading
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1500);

      // get request to server
      await axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/photos?albumId=${this.album.id}`
      })
        .then(async response => {
          this.photos = await response.data;
          console.log(this.photos); // for debugging
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
