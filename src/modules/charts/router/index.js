const routes = {
  path: '/indicadores',
  redirect: { name: 'Charts' },
  component: () => import('@/layouts/default/Layout'),
  children: [
    {
      name: 'Charts',
      path: '/indicadores',
      component: () => import('@/modules/charts/views/Indicadores'),
      meta: {
        title: 'Indicadores',
        subtitle: '',
        icon: 'mdi-finance',
        color: 'deep-purple',
        module: 'Idicadores',
        group: 'Gestión',
        requireAuth: true,
        permission: 'charts.index',
        visible: true
      }
    }
  ]
}
export default routes