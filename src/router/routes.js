const routes = [
  // for view only
  {
    path: '/',
    name: 'index',
    component: () => import('src/pages/Index.vue'),
  },

  // public album for viewing only
  {
    name: 'album',
    path: '/album/:slug/:id',
    props: true,
    component: () => import('src/pages/BaseAlbum.vue'),
  },

  // list of users 
  {
    name: 'users',
    path: '/users',
    component: () => import('pages/BaseUser.vue')
  },

  // album per user
  {
    name: 'profile',
    path: '/stalking/:slug/:id',
    props: true,
    component: () => import('pages/BaseProfile.vue')
  },
 
  // photo album per user
  {
    name: 'photo',
    path: '/photo/:slugUser/:slug/:id',
    props: true,
    component: () => import('pages/BasePhoto.vue')
  },
  
  { path: '*', component: () => import('pages/Error404.vue') }
]

export default routes
