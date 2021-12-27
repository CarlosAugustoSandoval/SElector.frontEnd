import Menu from '@/modules/settings/data/Menu'

const routes = {
    path: '/roles',
    redirect: { name: 'Roles' },
    component: () => import('@/layouts/default/Layout'),
    children: Menu.filter(menu => menu.meta?.module === 'Roles' && menu.type !== 'subheader')
}
export default routes