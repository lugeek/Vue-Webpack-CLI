import Home from './Home/App.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./About/About.vue'), // 懒加载
  },
]

export default routes;