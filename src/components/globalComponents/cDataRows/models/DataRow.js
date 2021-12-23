export default class DataRow {
    static create(IDataRow) {
        const { changes = 1, headers = [], name = '', filters = '', version = 1 } = IDataRow
        return new this(changes, headers, name, filters, version)
    }

    constructor (changes, headers, name, filters, version) {
        this.changes = changes
        this.headers = headers
        this.name = name
        this.filters = filters
        this.version = version
    }
}