import './payment.scss'
import template from './payment.html'
import { Native } from 'mamba-websdk'

let Payment = Native.MbPayment

export default {
  template,
  onMount () {
    Payment.enableCardEvent()
    document.addEventListener('oncardevent', _ => this.$router.push('/password'))
  },
  onUnmount () {
    Payment.disableCardEvent()
    document.removeEventListener('oncardevent', this.cardEventFunction)
  }
}
