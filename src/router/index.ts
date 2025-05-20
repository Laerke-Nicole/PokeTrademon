import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUsers } from '../modules/auth/userModels';
import { state } from '../modules/globalStates/state';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('../views/MarketView.vue'),
      meta: { requiresAuth: true, requiresUser: true }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/admin/AuthView.vue'),
      meta: { noneLoggedInUser: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/admin/RegisterView.vue'),
      meta: { noneLoggedInUser: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import('../views/CollectionView.vue'),
      meta: { requiresAuth: true, requiresUser: true }
    },
    {
      path: '/trades',
      name: 'trade',
      component: () => import('../views/TradeView.vue'),
      meta: { requiresAuth: true, requiresUser: true }
    },
    {
      path: '/news/:id',
      name: 'news-details',
      component: () => import('../views/NewsDetail.vue'),
    },   
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: () => import('../views/ProfileEditView.vue'),
      meta: { requiresAuth: true },
    },    
  ],
})


// navigation guard for routes where authentication is required
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresUser = to.matched.some(record => record.meta.requiresUser);
  const noneLoggedInUser = to.matched.some(record => record.meta.noneLoggedInUser);

  const { loadUser, user } = useUsers();

  // if not logged in go to log in page
  if (requiresAuth && !state.isLoggedIn) {
    next('/auth');
    return;
  }

  // only load user if needed
  if ((requiresAuth || requiresAdmin || requiresUser) && !user.value) {
    await loadUser();
  }

  const userRole = user.value?.userRole;

  // if user doesnt have admin as userrole go to home page
  if (requiresAdmin && userRole !== 'admin') {
    next('/');
    return;
  }

  // if user doesnt have user as userrole go to home page
  if (requiresUser && userRole !== 'user') {
    next('/');
    return;
  }

  // if user is logged in and tries to go to login page or register page
  if (noneLoggedInUser && state.isLoggedIn) {
    next('/');
    return;
  }

  next();
});


export default router
