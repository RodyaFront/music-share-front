<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-title>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="tableSearchModel"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :search="tableSearchModel"
            :headers="tableHeaders"
            :items="tableData"
          >
            <template v-slot:item.action="{ item }">
              <template v-if="loadings.includes(item._id)">
                <v-btn icon loading></v-btn>
              </template>
              <template v-else>
                <v-menu offset-y rounded="lg" transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="dense-list">
                    <v-list-item @click="handleEditRow(item)">
                      Изменить
                    </v-list-item>
                    <v-list-item @click="handleDeleteRow(item)">
                      Удалить
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="editRowDialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          Изменить данные.
        </v-card-title>
        <v-card-text> Редактируй данные трека. </v-card-text>

        <v-card-text>
          <v-form v-model="formModel">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editedRowData.name"
                  label="Название"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedRowData.link"
                  label="Ссылка"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editedRowData.description"
                  clearable
                  label="Описание"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="editedRowData.genres"
                  :items="genresList"
                  multiple
                  clearable
                  label="Жанры"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="editRowDialog = false">
            Назад
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="handleSaveEditChanges"
            :loading="loading"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { GENRES_LIST, MUSIC_TABLE_HEADERS } from '@/utils/defaultData'

export default {
  async created() {
    await this.updateTracksList()
  },
  data: () => ({
    tableSearchModel: '',
    loadings: [],
    formModel: null,
    loading: false,
    tableHeaders: MUSIC_TABLE_HEADERS,
    tableData: [],
    editRowDialog: false,
    editedRowData: {},
    genresList: GENRES_LIST,
  }),
  methods: {
    async handleSaveEditChanges() {
      const id = this.editedRowData._id
      this.addToLoading(id)
      const resp = await this.$store.dispatch('music/handleEditTrack', {
        id,
        data: this.editedRowData,
      })

      if (resp && resp.ok) {
        this.removeFromLoading(id)

        const idx = this.tableData.findIndex(
          (item) => item._id === this.editedRowData._id
        )
        const tableData = JSON.parse(JSON.stringify(this.tableData))
        tableData[idx] = this.editedRowData
        this.tableData = tableData

        this.editedRowData = {}
        this.editRowDialog = false
        return
      }
      this.editedRowData = {}
      this.editRowDialog = false
    },
    addToLoading(id) {
      this.loadings.push(id)
    },
    removeFromLoading(id) {
      this.loadings = this.loadings.filter((itemId) => itemId !== id)
    },
    async handleDeleteRow(item) {
      const { _id } = item
      this.addToLoading(_id)
      const resp = await this.$store.dispatch('music/handleDeleteTrack', _id)
      if (resp && resp.ok) {
        this.removeFromLoading(_id)
        return (this.tableData = this.tableData.filter(
          (item) => item._id !== _id
        ))
      }
    },
    handleEditRow(item) {
      this.editRowDialog = true
      this.editedRowData = JSON.parse(JSON.stringify(item))
    },
    async updateTracksList() {
      await this.$store.dispatch('music/handleFetchTracks')
      this.tableData = await this.$store.getters['music/tracks']
    },
  },
}
</script>
