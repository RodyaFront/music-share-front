<template>
  <v-row justify="center" align="center" style="min-height: calc(100vh - 65px)">
    <v-col cols="12" sm="8" md="6">
      <v-sheet elevation="0" class="pa-5" rounded="lg">
        <h2 class="mb-3">Приветики ✌</h2>
        <p class="body-1">
          В этом приложении ты можешь делиться понравившимися треками. Я в любой
          момент могу зайти и увидеть их.
        </p>
        <p class="body-1">
          Что бы начать пользоваться приложением достаточно перейти на станицу с
          иконкой
          <v-btn color="success" icon @click="$router.push('/music-list')">
            <v-icon>mdi-playlist-music</v-icon>
          </v-btn>
          и следовать инструкции.
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
