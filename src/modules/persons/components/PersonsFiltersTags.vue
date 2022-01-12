<template>
  <div class="mr-1" v-if="tags">
    <c-chip
        v-if="tags.filter_created_between && tags.filter_created_between.length"
        :title="tags.filter_created_between[0] === tags.filter_created_between[1] ? moment(tags.filter_created_between[0]).format('DD/MM/YYYY') : `Desde ${moment(tags.filter_created_between[0]).format('DD/MM/YYYY')} hasta ${moment(tags.filter_created_between[1]).format('DD/MM/YYYY')}`"
        subtitle="Fecha de registro"
        @close="tags.filter_created_between = []"
    />
    <c-chip
        v-if="tags.user_id"
        :title="userName"
        subtitle="Usuario"
        @close="tags.user_id = null"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'PersonsFiltersTags',
  props: {
    tags: {
      type: Object,
      default: null
    }
  },
  computed: {
    userName () {
      return this.tags?.user_id && this.complementsFilters?.users.find(x => x.id === this.tags.user_id)?.name || ''
    },
    ...mapState('personsModule',['complementsFilters']),
  }
}
</script>