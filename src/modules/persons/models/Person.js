export default class Person {
    static create(IPerson = null) {
        if (IPerson) {
            const {
                uuid = null,
                tipo_identificacion = 'CC',
                identificacion = null,
                apellido1 = null,
                apellido2 = null,
                candidato_camara = null,
                candidato_camara_id = null,
                candidato_senado = null,
                candidato_senado_id = null,
                nombre1 = null,
                nombre2 = null,
                nombre_completo = null,
                fecha_nacimiento = null,
                edad = null,
                sexo = null,
                testigo_electoral = null,
                celular = null,
                celular2 = null,
                email = null,
                codigo_departamento = null,
                codigo_municipio = null,
                zona = null,
                direccion = null,
                condicion_desplazamiento = null,
                codigo_departamento_votacion = null,
                codigo_municipio_votacion = null,
                lugar_votacion = null,
                mesa_votacion = null,
                observaciones = null,
                user_id = null,
                sincronizado = 0,
                ubdated_at = null,
                created_at = null,
                deleted_at = null,
                user = null,
                departamento = null,
                municipio = null,
                departamento_votacion = null,
                municipio_votacion = null
            } = IPerson
            return new this(
                uuid,
                tipo_identificacion,
                identificacion,
                apellido1,
                apellido2,
                candidato_camara,
                candidato_camara_id,
                candidato_senado,
                candidato_senado_id,
                nombre1,
                nombre2,
                nombre_completo,
                fecha_nacimiento,
                edad,
                sexo,
                testigo_electoral,
                celular,
                celular2,
                email,
                codigo_departamento,
                codigo_municipio,
                zona,
                direccion,
                condicion_desplazamiento,
                codigo_departamento_votacion,
                codigo_municipio_votacion,
                lugar_votacion,
                mesa_votacion,
                observaciones,
                user_id,
                sincronizado,
                ubdated_at,
                created_at,
                deleted_at,
                user,
                departamento,
                municipio,
                departamento_votacion,
                municipio_votacion
            )
        } else {
            return new this(
                null,
                'CC',
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                0,
                null,
                null,
                null,
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
        tipo_identificacion,
        identificacion,
        apellido1,
        apellido2,
        candidato_camara,
        candidato_camara_id,
        candidato_senado,
        candidato_senado_id,
        nombre1,
        nombre2,
        nombre_completo,
        fecha_nacimiento,
        edad,
        sexo,
        testigo_electoral,
        celular,
        celular2,
        email,
        codigo_departamento,
        codigo_municipio,
        zona,
        direccion,
        condicion_desplazamiento,
        codigo_departamento_votacion,
        codigo_municipio_votacion,
        lugar_votacion,
        mesa_votacion,
        observaciones,
        user_id,
        sincronizado,
        ubdated_at,
        created_at,
        deleted_at,
        user,
        departamento,
        municipio,
        departamento_votacion,
        municipio_votacion
    ) {
        this.uuid = uuid
        this.tipo_identificacion = tipo_identificacion
        this.identificacion = identificacion
        this.apellido1 = apellido1
        this.apellido2 = apellido2
        this.candidato_camara = candidato_camara
        this.candidato_camara_id = candidato_camara_id
        this.candidato_senado = candidato_senado
        this.candidato_senado_id = candidato_senado_id
        this.nombre1 = nombre1
        this.nombre2 = nombre2
        this.nombre_completo = nombre_completo
        this.fecha_nacimiento = fecha_nacimiento
        this.edad = edad
        this.sexo = sexo
        this.testigo_electoral = testigo_electoral
        this.celular = celular
        this.celular2 = celular2
        this.email = email
        this.codigo_departamento = codigo_departamento
        this.codigo_municipio = codigo_municipio
        this.zona = zona
        this.direccion = direccion
        this.condicion_desplazamiento = condicion_desplazamiento
        this.codigo_departamento_votacion = codigo_departamento_votacion
        this.codigo_municipio_votacion = codigo_municipio_votacion
        this.lugar_votacion = lugar_votacion
        this.mesa_votacion = mesa_votacion
        this.observaciones = observaciones
        this.user_id = user_id
        this.sincronizado = sincronizado
        this.ubdated_at = ubdated_at
        this.created_at = created_at
        this.deleted_at = deleted_at
        this.user = user
        this.departamento = departamento
        this.municipio = municipio
        this.departamento_votacion = departamento_votacion
        this.municipio_votacion = municipio_votacion
    }
}