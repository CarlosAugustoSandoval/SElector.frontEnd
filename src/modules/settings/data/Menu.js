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
            title: 'Personas',
            subtitle: 'Registro y Gestión',
            icon: 'mdi-account-group',
            color: 'green',
            module: 'Personas',
            requireAuth: true,
            permission: null,
            // permission: 'usuarios.inicio',
            visible: true
        }
    },
    {
        type: 'subheader',
        meta: {
            title: 'Administrativo',
            icon: 'mdi-cog',
            module: 'Admin',
            permission: null
        }
    },
    {
        name: 'Users',
        path: '/users',
        component: () => import('@/modules/users/views/Users'),
        meta: {
            title: 'Usuarios',
            subtitle: 'Registro y Gestión',
            icon: 'mdi-account-group',
            color: 'red',
            module: 'Users',
            requireAuth: true,
            permission: null,
            // permission: 'usuarios.inicio',
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
            icon: 'mdi-account-group',
            color: 'indigo',
            module: 'Roles',
            requireAuth: true,
            permission: null,
            // permission: 'usuarios.inicio',
            visible: true
        }
    }
]

export default Menu