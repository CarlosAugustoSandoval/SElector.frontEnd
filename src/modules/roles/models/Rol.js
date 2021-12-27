export default class Rol {
    static create (IRol = null) {
        if (IRol) {
            const { id = null, name = '', loading = false, permissions = [] } = IRol
            return new this(id, name, loading, permissions)
        } else {
            return new this(null, '', false, [])
        }
    }
    
    constructor (id, name, loading, permissions) {
        this.id = id
        this.name = name
        this.loading = loading
        this.permissions = permissions
    }
}