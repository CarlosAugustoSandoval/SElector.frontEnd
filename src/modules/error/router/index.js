const routes = {
    path: '*',
    redirect: {name: 'Error404'},
    component: () => import('@/layouts/blank/Blank'),
    children: [
        {
            name: 'Error404',
            path: '*',
            component: () => import('@/modules/error/views/404'),
            meta: {
                requiresAuth: false
            }
        }
    ]
}

export default routes