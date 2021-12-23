import Dexie from 'dexie'

const db = new Dexie('db')
db.version(1).stores({
    persons: 'uuid,identificacion,nombre_completo'
})

export default db
