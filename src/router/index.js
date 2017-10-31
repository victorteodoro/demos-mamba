import { MbRouter } from 'mamba-websdk'

/**
 *
 *    App da Ambev com Garantia Fornecedor - versão 2
 *    
 *    Ordem de Páginas:
 *
 *                      -> ListPending -> PendingDetail
 *    Login -> Welcome |
 *                      -> ListDone -> DoneDetail
 *
 **/

import Login from '../pages/login'
import Welcome from '../pages/welcome'
import ListPending from '../pages/list-pending'
import ListDone from '../pages/list-done'
import PendingDetail from '../pages/pending-detail'
import DoneDetail from '../pages/done-detail'

export default new MbRouter({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/list-pending',
      component: ListPending
    },
    {
      path: '/list-done',
      component: ListDone
    },
    {
      path: '/pending-detail',
      component: PendingDetail
    },
    {
      path: '/done-detail',
      component: DoneDetail
    }
  ]
})
