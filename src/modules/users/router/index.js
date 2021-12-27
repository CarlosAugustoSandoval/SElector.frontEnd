import Menu from '@/modules/settings/data/Menu'

const routes = {
    path: '/usuarios',
    redirect: { name: 'Users' },
    component: () => import('@/layouts/default/Layout'),
    children: Menu.filter(menu => menu.meta?.module === 'Users' && menu.type !== 'subheader')
}
export default routes