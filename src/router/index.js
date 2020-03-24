// libs
import Vue from 'vue'
import VueRouter from 'vue-router'
// pages
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AddList from '@/components/Ads/AddList'
import NewAd from '@/components/Ads/NewAd'

import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

import Orders from '@/components/User/Orders'
// helpers
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'ad',
    component: Ad
  },
  {
    path: '/list',
    name: 'list',
    component: AddList,
    beforeEnter: AuthGuard
  },
  {
    path: '/new',
    name: 'new',
    component: NewAd,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'reg',
    component: Registration
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // если при переходе по роуту, мы находиммся на определенном месте документа
    // savedPosition позволяет сохранить это при переходе
    if (savedPosition) return savedPosition
    // если имеется хэш , осуществляется переход к якорю
    if (to.hash) return { selector: to.hash }
    // иначе при переходе крутим  на 0\0
    return {
      x: 0,
      y: 0
    }
  },
  routes
})

export default router
