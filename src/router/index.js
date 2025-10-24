import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserData from '../views/UserData.vue'
import Question from '../views/Question.vue'
import Result from '../views/Result.vue'
import Thanks from '../views/Thanks.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/datos',
    name: 'UserData',
    component: UserData
  },
  {
    path: '/pregunta/:questionNumber',
    name: 'Question',
    component: Question,
    props: true
  },
  {
    path: '/resultado',
    name: 'Result',
    component: Result
  },
  {
    path: '/gracias',
    name: 'Thanks',
    component: Thanks
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router