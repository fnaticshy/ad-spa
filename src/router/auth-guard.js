import store from '../store/index'

export default async function (to, from, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
