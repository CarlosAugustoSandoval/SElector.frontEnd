const routes = {
    path: '/electores',
    redirect: { name: 'Persons' },
    component: () => import('@/layouts/default/Layout'),
    children: [
        {
            name: 'Persons',
            path: '/persons',
            component: () => import('@/modules/persons/views/Persons'),
            meta: {
                title: 'Electores',
                subtitle: 'Registro y Gestión',
                icon: 'mdi-account-group',
                color: 'green',
                module: 'Electores',
                group: '',
                requireAuth: true,
                permission: 'electores.index',
                visible: true
            }
        }
    ]
}
export default routes