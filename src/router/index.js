import { MbRouter } from 'mamba-websdk'

import Welcome from '../pages/welcome'
import Payment from '../pages/payment'
import Remove from '../pages/remove'
import Password from '../pages/password'
import Confirm from '../pages/confirm'
import End from '../pages/end'

export default new MbRouter({
  routes: [
    {
      path: '/',
      component: Welcome
    },
    {
      path: '/payment',
      component: Payment
    },
    {
      path: '/remove',
      component: Remove
    },
    {
      path: '/password',
      component: Password
    },
    {
      path: '/confirm',
      component: Confirm
    },
    {
      path: '/end',
      component: End
    }
  ]
})
