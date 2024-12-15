import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ContactsPage from '@/views/ContactsPage.vue';
import AddPostPage from '@/views/AddPostPage.vue';
import APostPage from '@/views/APostPage.vue';


// defining the routes array, mapping paths to components

const routes = [
  { path: "/", name: "MainPage", component: MainPage, meta: { requiresAuth: true } },
  { path: '/signup', name: 'SignupPage', component: SignupPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/contactus', name: 'ContactsPage', component: ContactsPage },
  { path: '/addpost', name: 'AddPostPage', component: AddPostPage, meta: { requiresAuth: true } },
  { path: '/apost', name: 'APostPage', component: APostPage, meta: { requiresAuth: true }},
  { path: "/apost/:id", name: "APostPage", component: APostPage, meta: { requiresAuth: true } },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); 
  } else {
    next(); 
  }
});

export default router;
