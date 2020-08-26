
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/procedimentos', component: () => import('pages/Procedimentos.vue') },
      { path: '/relatorios', component: () => import('pages/Relatorios.vue') },
      { path: '/atendentes', component: () => import('pages/Atendentes.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
