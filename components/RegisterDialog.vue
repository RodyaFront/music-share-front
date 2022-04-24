<template>
  <v-dialog
    v-model="dialogModel"
    width="300"
    transition="slide-x-reverse-transition"
  >
    <v-card>
      <v-card-title class="text-h5 lighten-2"> Регистрация </v-card-title>
      <v-card-text>
        Заполни форму и отправь заявку на регистрацию.
      </v-card-text>

      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.email"
                label="Почта"
                :disabled="loading"
                name="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.password"
                label="Пароль"
                type="password"
                name="password"
                :disabled="loading"
              ></v-text-field>
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
          @click="switchAuthDialogs"
          :disabled="loading"
        >
          Назад
        </v-btn>
        <v-btn color="primary" text @click="handleRegister" :loading="loading">
          Отправить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading: false,
    formData: {
      email: '',
      password: '',
    },
  }),
  computed: {
    dialogModel: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('update:dialog', value)
      },
    },
  },
  methods: {
    async handleRegister() {
      this.loading = true
      const response = await this.$store.dispatch(
        'auth/register',
        this.formData
      )
      if (response.ok) {
        return this.closeDialog(), (this.loading = false)
      }
      return window.alert('Something wrong, try again.'), (this.loading = false)
    },
    closeDialog() {
      this.$emit('close')
    },
    switchAuthDialogs() {
      this.$emit('switchDialog')
    },
  },
}
</script>
