<template>
  <v-container style="height: 100%">
    <v-row
        justify="center"
        align="center"
        style="height: 100%"
    >
      <v-card
          flat
          tile
          class="text-center w-full error-page pa-3"
      >
        <v-img src="../images/error404.svg" max-height="600" contain/>
        <div class="display-2 mt-10">¿Cómo has llegado hasta aquí?</div>
        <div class="mt-3 mb-6">Lo sentimos, parece que no podemos encontrar la página que estás buscando.</div>
        <v-btn to="/" large color="primary">Ir a un lugar seguro</v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang="scss">
.error-page {
  min-width: 300px;
}
</style>