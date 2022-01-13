const routes = {
    path: '/roles',
    redirect: { name: 'Roles' },
    component: () => import('@/layouts/default/Layout'),
    children: [
        {
            name: 'Roles',
            path: '/roles',
            component: () => import('@/modules/roles/views/Roles'),
            meta: {
                title: 'Roles',
                subtitle: 'Registro y Gestión',
                icon: 'mdi-account-switch',
                color: 'indigo',
                module: 'Roles',
                group: 'Administrativo',
                requireAuth: true,
                permission: 'roles.index',
                visible: true
            }
        }
    ]
}
export default routes