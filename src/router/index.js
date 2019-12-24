import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';

Vue.use(VueRouter)

const load = view => {
  return () => import(`@/views/${view}.vue`)
}

const routes = [{
  path: '/',
  component: load('Home'),
  meta: {
    requiresAuth: true
  }
}, {
  path: '/home',
  name: 'home',
  component: load('Home'),
  meta: {
    requiresAuth: true
  }
},{
  path: '/auth',
  name: 'auth',
  component: load('Auth'),
  meta: {
    requiresNotAuth: true
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresNotAuth = to.matched.some(record => record.meta.requiresNotAuth);
  if (requiresAuth && !store.state.isLogged) {
    next('/auth');
  } else if (requiresNotAuth && store.state.isLogged) {
    next('/home');
  } else {
    next();
  }
});

export default router