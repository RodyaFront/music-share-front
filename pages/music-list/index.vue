<template>
  <v-container>
    <template v-if="$newDesign">
      <div class="track__wrapper">
        <div v-for="(track, i) in tracks" :key="i" class="track__item">
          <div
            class="track__img"
            :style="`background-image: url('${track.previewImage}')`"
            @click="goToPage(track.link)"
          >
            <v-icon large color="white">mdi-play</v-icon>
          </div>
          <div class="track__content">
            <div class="track__name">{{ track.name }}</div>
            <div class="track__description">{{ track.description }}</div>
            <div class="track__genres">
              <div
                v-for="genre in track.genres"
                :key="genre"
                class="genre__item"
              >
                {{ genre }}
              </div>
            </div>
          </div>
          <div class="track__link"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <v-row>
        <v-col
          v-for="(track, i) in tracks"
          :key="i"
          lg="3"
          md="3"
          sm="4"
          cols="4"
          class="shrink"
        >
          <v-card
            class="d-flex justify-space-between fd-column"
            style="height: 100%"
          >
            <div>
              <v-card-title>{{ track.name }}</v-card-title>
              <v-card-text>{{ track.description }}</v-card-text>
            </div>
            <div>
              <v-divider />
              <v-card-actions class="d-flex justify-end">
                <v-btn text small color="primary" @click="goToPage(track.link)">
                  Слушать
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <v-dialog v-model="addTrackDialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 lighten-2"> Новая карточка </v-card-title>
        <v-card-text>
          Введи ссылку на трек из
          <v-btn
            text
            color="error"
            small
            style="text-transform: none; padding: 5px 2px"
            @click="goToPage('https://music.youtube.com/')"
            >Youtube music</v-btn
          >
          и выбери жанры. Дальше программа сама всё узнает о этом треке.
        </v-card-text>

        <v-card-text>
          <v-form v-model="formModel">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="link"
                  label="Ссылка"
                  clearable
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="genres"
                  :items="genresList"
                  multiple
                  clearable
                  label="Жанры"
                  :disabled="loading"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="addTrackDialog = false"
            :disabled="loading"
          >
            Назад
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="handleSaveCard"
            :loading="loading"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          large
          icon
          color="success"
          elevation="1"
          v-on="on"
          @click="addTrackDialog = !addTrackDialog"
          style="position: fixed; right: 50px; bottom: 50px"
        >
          <v-icon>mdi-music-note-plus</v-icon>
        </v-btn>
      </template>
      <span>Добавить трек</span>
    </v-tooltip>
  </v-container>
</template>

<script>
import { GENRES_LIST } from '@/utils/defaultData'

export default {
  data: () => ({
    tracks: [],
    loading: false,
    fab: false,
    addTrackDialog: false,
    formModel: null,
    name: null,
    link: null,
    genres: null,
    description: null,
    genresList: GENRES_LIST,
  }),
  async created() {
    await this.updateTracksList()
  },
  computed: {
    $newDesign() {
      return this.$store.getters.$newDesign
    },
  },
  methods: {
    goToPage(path) {
      window.open(path, '_blank')
    },
    async updateTracksList() {
      this.$store.commit('setLoading', true)
      await this.$store.dispatch('music/handleFetchTracks')
      this.tracks = await this.$store.getters['music/tracks']
      this.$store.commit('setLoading', false)
    },
    async handleSaveCard() {
      this.loading = true

      const newTrackData = {
        link: this.link,
        genres: this.genres,
      }

      await this.$store.dispatch('music/handleAddTrack', newTrackData)
      await this.updateTracksList()

      this.link = ''
      this.genres = []

      this.loading = false
      this.addTrackDialog = false
    },
  },
}
</script>
