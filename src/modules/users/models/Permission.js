export default class Permission {
    static create (IPermission) {
        const { id, name, module, description, loading = false } = IPermission
        return new this(id, name, module, description, loading)
    }

    constructor (id, name, module, description, loading) {
        this.id = id
        this.name = name
        this.module = module
        this.description = description
        this.loading = loading
    }
}