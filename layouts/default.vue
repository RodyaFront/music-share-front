<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <transition name="loader">
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
          class="app-nav__loading"
        ></v-progress-linear>
      </transition>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      clipped-left
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click="right = !right">
          <v-list-item-action>
            <v-icon :light="!$vuetify.theme.dark" :dark="$vuetify.theme.dark">
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-list-item-action>
            <v-icon :light="!$vuetify.theme.dark" :dark="$vuetify.theme.dark">
              {{
                $vuetify.theme.dark
                  ? 'mdi-white-balance-sunny'
                  : 'mdi-weather-night'
              }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Theme</v-list-item-title>
        </v-list-item>
        <v-list-item @click="signInDialog = true">
          <v-list-item-action>
            <v-icon :light="!$vuetify.theme.dark" :dark="$vuetify.theme.dark">
              mdi-account
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Sign in</v-list-item-title>
        </v-list-item>
        <v-list-item @click="switchDesign">
          <v-list-item-action>
            <v-icon :light="!$vuetify.theme.dark" :dark="$vuetify.theme.dark">
              mdi-shimmer
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>New design</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog
      v-model="signInDialog"
      width="300"
      transition="slide-x-transition"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2"> Авторизируйся </v-card-title>
        <v-card-text>
          Войди в аккаунт что-бы получить дополнительные возможности.
        </v-card-text>

        <v-card-text>
          <v-form v-model="formModel">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.email"
                  label="Почта"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.password"
                  label="Пароль"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="signInDialog = false">
            Назад
          </v-btn>
          <v-btn color="primary" text @click="handleSignIn" :loading="loading">
            Войти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { NAV_ITEMS } from '@/utils/defaultData'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      signInDialog: false,
      formModel: null,
      drawer: true,
      fixed: false,
      items: NAV_ITEMS,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Music share',
      formData: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    switchDesign() {
      if (this.$store.getters.$newDesign) {
        return this.$store.commit('setNewDesign', false)
      }
      this.$store.commit('setNewDesign', true)
    },
    handleSignIn() {
      console.log(this.formData)
      this.signInDialog = false
    },
  },
  computed: {
    loading() {
      return this.$store.getters.$loading
    },
  },
}
</script>

<style lang="scss">
.loader-enter-active,
.loader-leave-active {
  transition: 500ms ease-in-out;
}
.loader-enter-from {
  opacity: 0;
}
.loader-enter-to {
  opacity: 1;
}
.loader-leave-from {
  opacity: 1;
}
.loader-leave-to {
  opacity: 0;
}
</style>
