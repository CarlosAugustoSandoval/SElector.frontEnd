const routes = {
    path: '/',
    redirect: { name: 'Home' },
    component: () => import('@/layouts/default/Layout'),
    children: [
        {
            name: 'Home',
            path: '/home',
            component: () => import('@/views/Home'),
            meta: {
                title: 'Inicio',
                subtitle: '',
                icon: 'mdi-home',
                color: 'primary',
                module: 'Main',
                group: '',
                requireAuth: true,
                permission: null,
                visible: true
            }
        }
    ]
}
export default routes