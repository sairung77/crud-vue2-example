import Vue from 'vue'
import VueRouter from 'vue-router'
import DbRead from '../views/DbRead';
import DbCreate from '../views/DbCreate';
import DbUpdate from '../views/DbUpdate';
import DbDelete from '../views/DbDelete';
import DbPaginate from '../views/DbPaginate';
import DbSearch from '../views/DbSearch';

Vue.use(VueRouter)

const routes = [
  { path : '/db/read', component : DbRead},
  { path : '/db/create', component : DbCreate},
  { path : '/db/update', component : DbUpdate},
  { path : '/db/delete', component : DbDelete},
  { path : '/db/paginate', component : DbPaginate},
  { path : '/db/search', component : DbSearch},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
