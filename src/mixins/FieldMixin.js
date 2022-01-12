export default {
    props: {
        label: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        hint: {
            type: String,
            default: null
        },
        persistentHint: {
            type: Boolean,
            default: true
        },
        outlined: {
            type: Boolean,
            default: true
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        dense: {
            type: Boolean,
            default: true
        },
        hideDetails: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        counter: {
            type: Number,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        vid: {
            type: String,
            default: null
        },
        rules: {
            type: [String, Object],
            default: null
        },
        suffix: {
            type: String,
            default: null
        }
    }
}