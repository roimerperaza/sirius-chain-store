import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

const loadView = view => {
  return () => import(`@/views/${view}.vue`)
}

const routes = [{
  path: '/',
  component: loadView('Dashboard'),
  meta: {
    requiresAuth: false
  }
},{
  path: '/dashboard',
  name: 'dashboard',
  component: loadView('Dashboard'),
  meta: {
    requiresAuth: false
  }
}, {
  path: '/home',
  name: 'home',
  component: loadView('Home'),
  meta: {
    requiresAuth: true
  }
}, {
  path: '/auth',
  name: 'auth',
  component: loadView('Auth'),
  meta: {
    requiresNotAuth: true
  }
}, {
  path: '/profile',
  name: 'profile',
  component: loadView('Profile'),
  children: [{
    path: 'account',
    component: loadView('Account-detail'),
    name: 'AccountDetail'
  },{
    path: 'home',
    component: loadView('Home'),
    name: 'Home'
  }],
  meta: {
    requiresAuth: true
  }
}, {
  path: '*',
  redirect: '/home'
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  /*const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresNotAuth = to.matched.some(record => record.meta.requiresNotAuth);
  if (requiresAuth && !store.getters['accountStore/isLogged']) {
    next('/auth');
  } else if (requiresNotAuth && store.getters['accountStore/isLogged']) {
    next('/home');
  } else {
    next();
  }*/
  next();
});

export default router