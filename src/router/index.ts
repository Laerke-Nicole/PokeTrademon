import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/auth',
      name: 'auth',
      component: () => import('../views/admin/AuthView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/admin/RegisterView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/trades',
      name: 'trade',
      component: () => import('../views/TradeView.vue'),
    },
    {
      path: '/news/:id',
      name: 'news-details',
      component: () => import('../views/NewsDetail.vue'),
    },   
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: () => import('@/views/ProfileEditView.vue'),
      meta: { requiresAuth: true },
    },    
  ],
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isToken');
  const userRole = localStorage.getItem('userRole');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  // user isnt logged in and try to access a page that requires auth
  if (requiresAuth && !isAuthenticated) {
    next('/auth');
  
  // user cannot access admin page if their userRole isnt admin
  } else if (requiresAdmin && userRole !== 'admin') {
    next('/'); 
  
  } else {
    next();
  }
});

export default router
