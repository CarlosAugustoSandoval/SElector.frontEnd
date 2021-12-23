<template>
  <div class="optionsButtons">
    <v-toolbar>
      <c-tooltip
          v-if="detailButton"
          :top="top"
          :left="left"
          :bottom="bottom"
          :right="right"
          :tooltip='detailTooltip'
          :disabled="!detailTooltip"
      >
        <v-btn
            class='ma-1'
            :color='detailColor'
            depressed
            fab
            x-small
            @click="$emit('detail')"
        >
          <v-icon>{{ detailIcon }}</v-icon>
        </v-btn>
      </c-tooltip>
      <c-tooltip
          v-if="editButton"
          :top="top"
          :left="left"
          :bottom="bottom"
          :right="right"
          :tooltip='editTooltip'
          :disabled="!editTooltip"
      >
        <v-btn
            class='ma-1'
            :color='editColor'
            depressed
            fab
            x-small
            @click="$emit('edit')"
        >
          <v-icon>{{ editIcon }}</v-icon>
        </v-btn>
      </c-tooltip>
      <c-tooltip
          v-if="deleteButton"
          :top="top"
          :left="left"
          :bottom="bottom"
          :right="right"
          :tooltip='deleteTooltip'
          :disabled="!deleteTooltip"
      >
        <v-btn
            class='ma-1'
            :color='deleteColor'
            depressed
            fab
            x-small
            @click="$emit('delete')"
        >
          <v-icon>{{ deleteIcon }}</v-icon>
        </v-btn>
      </c-tooltip>
      <slot/>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'OptionsButtons',
  props: {
    detailButton: {
      type: Boolean,
      default: false
    },
    detailTooltip: {
      type: String,
      default: 'Ver detalle'
    },
    detailColor: {
      type: String,
      default: 'info'
    },
    detailIcon: {
      type: String,
      default: 'mdi-file-find'
    },
    editButton: {
      type: Boolean,
      default: false
    },
    editTooltip: {
      type: String,
      default: 'Editar'
    },
    editColor: {
      type: String,
      default: 'warning'
    },
    editIcon: {
      type: String,
      default: 'mdi-pencil'
    },
    deleteButton: {
      type: Boolean,
      default: false
    },
    deleteTooltip: {
      type: String,
      default: 'Eliminar'
    },
    deleteColor: {
      type: String,
      default: 'error'
    },
    deleteIcon: {
      type: String,
      default: 'mdi-delete'
    },
    top: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.optionsButtons > header {
  position: absolute !important;
  right: 8px !important;
  height: 0 !important;
}

.optionsButtons > header .v-toolbar__content, .v-toolbar__extension {
  padding: 0 !important;
}

.v-data-table tr .optionsButtons {
  align-content: center;
  margin-top: -2.5em;
  display: none;
}

.v-data-table tr:hover .optionsButtons {
  display: block;
}
</style>