export default class Rol {
    static create (IRol) {
        const { id, name, loading = false } = IRol
        return new this(id, name, loading)
    }
    
    constructor (id, name, loading) {
        this.id = id
        this.name = name
        this.loading = loading
    }
}