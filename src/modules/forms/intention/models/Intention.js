export default class Intention {
    static create(IIntention = null) {
        if (IIntention) {
            const {
                uuid = null,
                elector_uuid = null,
                candidato_camara_id = null,
                candidato_senado_id = null,
                sincronizado = 0,
                user_id = null,
                user = null,
                ubdated_at = null,
                created_at = null,
                deleted_at = null,
            } = IIntention
            return new this(
                uuid,
                elector_uuid,
                candidato_camara_id,
                candidato_senado_id,
                sincronizado,
                user_id,
                user,
                ubdated_at,
                created_at,
                deleted_at,
            )
        } else {
            return new this(
                null,
                null,
                null,
                null,
                0,
                null,
                null,
                null,
                null,
                null
            )
        }
    }

    constructor(
        uuid,
        elector_uuid,
        candidato_camara_id,
        candidato_senado_id,
        sincronizado,
        user_id,
        user,
        ubdated_at,
        created_at,
        deleted_at
    ) {
        this.uuid = uuid
        this.elector_uuid = elector_uuid
        this.candidato_camara_id = candidato_camara_id
        this.candidato_senado_id = candidato_senado_id
        this.sincronizado = sincronizado
        this.user_id = user_id
        this.user = user
        this.ubdated_at = ubdated_at
        this.created_at = created_at
        this.deleted_at = deleted_at
    }
}