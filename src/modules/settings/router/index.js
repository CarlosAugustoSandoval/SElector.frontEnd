import Menu from '@/modules/settings/data/Menu'

const routes = {
    path: '/',
    redirect: { name: 'Home' },
    component: () => import('@/layouts/default/Layout'),
    children: Menu.filter(menu => menu.meta?.module === 'Main')
}
export default routes