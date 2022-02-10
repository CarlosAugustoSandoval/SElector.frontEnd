import Dexie from 'dexie'

const db = new Dexie('db')
db.version(2).stores({
    persons: 'uuid,identificacion,nombre_completo',
    intentions: 'uuid'
})

export default db
