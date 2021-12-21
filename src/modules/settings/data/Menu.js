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
            module: 'Personas',
            permission: 'usuarios.inicio'
        }
    }
]

export default Menu