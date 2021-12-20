import Menu from '@/modules/settings/data/Menu'

const routes = {
    path: '/personas',
    redirect: { name: 'Persons' },
    component: () => import('@/layouts/default/Layout'),
    children: Menu.filter(menu => menu.meta?.module === 'Personas' && menu.type !== 'subheader')
}
export default routes