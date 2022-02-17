<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
      hide-overlay
      persistent
      :retain-focus="false"
  >
    <v-card tile flat>
      <v-card-title
          class="py-1"
          style="background-color: #125a9c"
      >
        <v-list-item class="pa-0" dark>
          <v-list-item-avatar class="mr-1">
            <v-icon>mdi-file-find</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              Detalle de Elector
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
                large
                icon
                @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-title>
      <v-container v-if="person">
        <v-row>
          <v-col cols="12">
            <personal-information :item="person"/>
          </v-col>
          <v-col
              cols="12"
              v-if="permissionsIntention.view || permissionsIntention.create"
          >
            <v-card tile>
              <v-tabs
                  v-model="tab"
                  fixed-tabs
                  right
                  icons-and-text
                  show-arrows
                  :color="tabColor"
              >
                <v-tabs-slider/>
                <v-tab
                    href="#tab-1"
                >
                  <span class="subtitle-1">Intención de voto</span>
                </v-tab>
              </v-tabs>
              <v-tabs-items
                  v-model="tab"
                  class="mt-2"
                  touchless
              >
                <v-tab-item
                    value="tab-1"
                >
                  <intentions
                      :item="person"
                      :color="tabColor"
                      @saved="updated"
                  />
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <loading
          :value="loading"
          absolute
      />
    </v-card>
  </v-dialog>
</template>

<script>
import PersonalInformation from './PersonalInformation'
import Intentions from './tabs/Intentions'
import store from '@/store'
export default {
  name: 'PersonDetail',
  components: {
    Intentions,
    PersonalInformation
  },
  data: () => ({
    tab: null,
    loading: false,
    dialog: false,
    person: null
  }),
  computed: {
    tabColor() {
      return this.tab === 'tab-1'
          ? 'primary'
          : this.tab === 'tab-2'
              ? 'teal'
              : this.tab === 'tab-3'
                  ? 'warning'
                  : this.tab === 'tab-4'
                      ? 'indigo'
                      : 'purple'
    },
    permissionsIntention () {
      return store.getters['authModule/permissionsByModule']('intencionVoto')
    }
  },
  methods: {
    updated() {
      this.getItem(this.person.uuid)
      this.$emit('saved')
    },
    getItem(uuid) {
      this.loading = true
      this.axios.get(`electores/elector/${uuid}`)
          .then(response => {
            this.person = response.data
            this.tab = 1
            this.loading = false
          })
          .catch(error => {
            this.$store.commit('snackbar', {color: 'error', message: `al recuperar el registro del elector.`, error: error})
            this.close()
          })
    },
    open(person = null) {
      if (person?.uuid) {
        this.getItem(person.uuid)
        this.dialog = true
      } else {
        this.$store.commit('snackbar', {color: 'error', message: 'No se ha seleccionado un registro válido.'})
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.person = null
      }, 500)
    }
  }
}
</script>