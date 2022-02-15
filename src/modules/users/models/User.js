export default class User {
    static create(IUser = null) {
        if (IUser) {
            const {
                id = null,
                name = '',
                email = '',
                permissions = [],
                roles = [],
                es_lider = 0,
                es_coordinador = 0,
                coordinador_id = null,
            } = IUser
            return new this(id, name, email, permissions, roles, es_lider, es_coordinador, coordinador_id)
        } else {
            return new this(null, '', '', [], [], 0, 0, null)
        }
    }

    constructor (id, name, email, permissions, roles, es_lider, es_coordinador, coordinador_id) {
        this.id = id
        this.name = name
        this.email = email
        this.permissions = permissions
        this.roles = roles
        this.es_lider = es_lider
        this.es_coordinador = es_coordinador
        this.coordinador_id = coordinador_id
    }
}