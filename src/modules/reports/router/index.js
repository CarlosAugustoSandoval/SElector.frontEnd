const routes = {
  path: '/reports',
  redirect: { name: 'Reports' },
  component: () => import('@/layouts/default/Layout'),
  children: [
    {
      name: 'Reports',
      path: '/reports',
      component: () => import('@/modules/reports/views/Reports'),
      meta: {
        title: 'Reportes',
        subtitle: 'Descarga',
        icon: 'mdi-file-table',
        color: 'green',
        module: 'Reportes',
        group: 'Gestión',
        requireAuth: true,
        permission: 'reports.index',
        visible: true
      }
    }
  ]
}
export default routes