import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import * as fb from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    const firebaseConfig = {
      apiKey: 'AIzaSyB4gbLPFsqwjAJiqEEpXorwlxKIZyfHHmA',
      authDomain: 'fns-ads-project.firebaseapp.com',
      databaseURL: 'https://fns-ads-project.firebaseio.com',
      projectId: 'fns-ads-project',
      storageBucket: 'fns-ads-project.appspot.com',
      messagingSenderId: '244153687805',
      appId: '1:244153687805:web:d9bdc806eb961c6c822894',
      measurementId: 'G-VSSFENY598'
    }

    fb.initializeApp(firebaseConfig)
    // при перезагрузке стр. смотрим localStorage,
    // если пользователь был залогинен, логиним опять.
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
