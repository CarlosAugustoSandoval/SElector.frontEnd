export default class Report {
    static create(IReport = null) {
        const constItems = [
            {header: 'Seleccionar o Crear un item'}
        ]
        if (IReport) {
            const {
                id = null,
                descripcion = '',
                query = '',
                nombre = '',
                user_id = null,
                created_at = null,
                updated_at = null,
                columns = [],
                roles = [],
                variables = [],
                items = constItems
            } = IReport
            return new this(id, descripcion, query, nombre, user_id, created_at, updated_at, columns, roles, variables, items)
        } else {
            return new this(null, '', '', '', null, null, null, [], [], [], constItems)
        }
    }

    constructor(id, descripcion, query, nombre, user_id, created_at, updated_at, columns, roles, variables, items) {
        this.id = id
        this.descripcion = descripcion
        this.query = query
        this.nombre = nombre
        this.user_id = user_id
        this.created_at = created_at
        this.updated_at = updated_at
        this.columns = columns
        this.roles = roles
        this.variables = variables
        this.items = items
    }
}