import './styles/index.scss'
import Mamba from 'mamba-websdk'
import router from './router'

/* eslint-disable no-new */
new Mamba({
  el: '#app'
})

Mamba.use(router)
