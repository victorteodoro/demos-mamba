import './remove.scss'
import template from './remove.html'

export default {
  template,
  onMount () {
    setTimeout(_ => this.$router.push('/confirm'), 2000)
  }
}
