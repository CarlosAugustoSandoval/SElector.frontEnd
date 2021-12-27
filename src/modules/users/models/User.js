export default class User {
    static create(IUser = null) {
        if (IUser) {
            const {
                id = null,
                name = '',
                email = '',
                permissions = [],
                roles = []
            } = IUser
            return new this(id, name, email, permissions, roles)
        } else {
            return new this(null, '', '', [], [])
        }
    }

    constructor (id, name, email, permissions, roles) {
        this.id = id
        this.name = name
        this.email = email
        this.permissions = permissions
        this.roles = roles
    }
}