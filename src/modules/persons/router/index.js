import Menu from '@/modules/settings/data/Menu'

const routes = {
    path: '/electores',
    redirect: { name: 'Persons' },
    component: () => import('@/layouts/default/Layout'),
    children: Menu.filter(menu => menu.meta?.module === 'Electores' && menu.type !== 'subheader')
}
export default routes