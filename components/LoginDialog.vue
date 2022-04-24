<template>
  <v-dialog v-model="dialogModel" width="300" transition="slide-x-transition">
    <v-card>
      <v-card-title class="text-h5 lighten-2"> Авторизируйся </v-card-title>
      <v-card-text>
        Войди в аккаунт что-бы получить дополнительные возможности.
      </v-card-text>
      <v-card-text class="d-flex justify-end">
        <span class="f-centered">Нет аккаунта?</span>
        <v-spacer />
        <v-btn
          text
          small
          style="text-transform: none; padding: 1px 3px"
          color="warning"
          @click="switchAuthDialogs"
        >
          Создать аккаунт.
        </v-btn>
      </v-card-text>

      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.email"
                label="Почта"
                name="email"
                :disabled="loading"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.password"
                label="Пароль"
                name="password"
                type="password"
                :disabled="loading"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog" :disabled="loading">
          Назад
        </v-btn>
        <v-btn color="primary" text @click="handleSignIn" :loading="loading">
          Войти
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
    async handleSignIn() {
      this.loading = true
      const authorized = await this.$store.dispatch('auth/login', this.formData)
      if (authorized) {
        return this.closeDialog(), (this.loading = false)
      }
      return window.alert('Something wrong, try again.')
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
