export default function ({ store, redirect }) {
  store.dispatch('auth/autoLogin')
}
