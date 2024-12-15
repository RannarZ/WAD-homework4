import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ContactsPage from '@/views/ContactsPage.vue';
import AddPostPage from '@/views/AddPostPage.vue';
import APostPage from '@/views/APostPage.vue';


// defining the routes array, mapping paths to components

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/signup', name: 'SignupPage', component: SignupPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/contactus', name: 'ContactsPage', component: ContactsPage }
  { path: '/addpost', name: 'AddPostPage', component: AddPostPage },
  { path: '/apost', name: 'APostPage', component: APostPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
