<template>
  <div class="mr-1" v-if="tags">
    <c-chip
        v-if="tags.filter_created_between && tags.filter_created_between.length"
        :title="tags.filter_created_between[0] === tags.filter_created_between[1] ? moment(tags.filter_created_between[0]).format('DD/MM/YYYY') : `Desde ${moment(tags.filter_created_between[0]).format('DD/MM/YYYY')} hasta ${moment(tags.filter_created_between[1]).format('DD/MM/YYYY')}`"
        subtitle="Fecha de registro"
        @close="tags.filter_created_between = []"
    />
  </div>
</template>

<script>
export default {
  name: 'PersonsFiltersTags',
  props: {
    tags: {
      type: Object,
      default: null
    }
  }
}
</script>