const Menu =[
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
    },
    {
        name: 'Persons',
        path: '/persons',
        component: () => import('@/modules/persons/views/Persons'),
        // component: () => import('@/modules/error/views/InConstruction'),
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
    },
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
    },
    {
        name: 'Roles',
        path: '/roles',
        component: () => import('@/modules/roles/views/Roles'),
        meta: {
            title: 'Roles',
            subtitle: 'Registro y Gestión',
            icon: 'mdi-account-switch',
            color: 'indigo',
            module: 'Roles',
            group: 'Administrativo',
            requireAuth: true,
            permission: 'roles.index',
            visible: true
        }
    }
]

export default Menu