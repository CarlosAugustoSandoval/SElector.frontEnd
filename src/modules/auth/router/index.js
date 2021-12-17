export default {
    path: '/auth',
    redirect: { name: 'Login' },
    component: () => import('@/layouts/blank/Blank'),
    children: [
        {
            name: 'Login',
            path: 'login',
            component: () => import('@/modules/auth/views/Login'),
            meta: {
                requiresAuth: false,
                title: 'Login'
            }
        }
        // {
        //     name: 'ForgotPassword',
        //     path: 'forgot-password',
        //     component: () => import('@/modules/auth/views/ForgotPassword'),
        //     meta: {
        //         requiresAuth: false
        //     }
        // },
        // {
        //     name: 'Error',
        //     path: 'error',
        //     component: () => import('@/modules/auth/views/Error'),
        //     meta: {
        //         requiresAuth: false
        //     }
        // }
    ]
}