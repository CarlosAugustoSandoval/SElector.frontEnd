const routes = {
    path: '/usuarios',
    redirect: { name: 'Users' },
    component: () => import('@/layouts/default/Layout'),
    children: [
        {
            name: 'Users',
            path: '/users',
            component: () => import('@/modules/users/views/Users'),
            meta: {
                title: 'Usuarios',
                subtitle: 'Registro y Gestión',
                icon: 'mdi-account-multiple',
                color: 'red',
                module: 'Users',
                group: 'Administrativo',
                requireAuth: true,
                permission: 'users.index',
                visible: true
            }
        }
    ]
}
export default routes