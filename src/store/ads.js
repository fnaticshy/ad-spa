import * as fb from 'firebase'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, { title, description, id }) {
      // ищим эл. в масиве по айди
      const ad = state.ads.find(el => {
        return el.id === id
      })
      // переопределяем поля в найденном эл.
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        // пушим newAd в database
        const ad = await fb.database().ref('ads').push(newAd)
        // получаем формат картинки
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        // создаем переменную под URL картинки
        let fileUrl = null
        // записываем картинку в fb storage, получаем промис
        const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
        // достаем url из промиса
        await fileData.ref.getDownloadURL().then(url => {
          fileUrl = url
        })
        // обнавляем src в БД
        // ref - нужная таблица
        // child - получаем нужный эллемент
        await fb.database().ref('/ads').child(ad.key).update({
          imageSrc: fileUrl
        })
        // убираем лоудер
        commit('setLoading', false)
        // разворачиваем обьект полученный из таблицы,
        // присваеваем айди полученный из fb
        // присваеваем url
        // мутируем стейт добавля в масив обьявлений
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc: fileUrl
        })
      } catch (error) {
        // либо ловим ошибку
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // обращаемся в fb database к нужной таблице
        const fbVal = await fb.database().ref('ads').once('value')
        // извлекаем value из DataSnapshot.
        // если извлекли null, то в fb database пусто
        const ads = fbVal.val()

        const resultAds = []
        // проходимся по всем эллементам котоыре получили
        // для каждого в цикле создаем обьект и заполняем.
        // key это наш сгенерированный в fb айди.
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.ownerId,
              ad.imageSrc,
              ad.promo,
              key
            )
          )
        })

        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // для обновления обращаемся к нужной таблице,
        // находим нужное обьявление по айди которое присвоил fb
        // вызываем апдейт, передаем в него обьект.
        await fb.database().ref('ads').child(id).update({
          title, description
        })
        // мутируем стейт
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(el => el.promo)
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
