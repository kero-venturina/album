<template>
  <q-footer class="bg-grey-1 q-py-md q-px-md text-dark border-top">
    <div class="row q-mx-auto" style="max-width: 1080px">
      <!-- left / top -->
      <div
        class="q-my-auto col-12 col-sm-6"
        :class="{ 'text-center': !$q.screen.gt.xs }"
      >
        <span class="text-dark text-weight-bold text-body1">
          Album
        </span>
        <span class="text-caption text-weight-medium">
          © {{ new Date().getFullYear() }}
        </span>
        <div class="text-caption text-grey-6">
          by: Kero Venturina
        </div>
      </div>

      <!-- right / bottom -->
      <div
        class="q-ml-auto q-my-auto col-12 col-sm-6"
        :class="[
          { 'text-center q-pt-sm': !$q.screen.gt.xs },
          { 'text-right': $q.screen.gt.xs }
        ]"
      >
        <q-btn flat round color="azure" icon="public"></q-btn>
        <q-btn flat round color="azure" icon="facebook"></q-btn>
      </div>
    </div>
  </q-footer>
</template>
