import './end.scss'
import template from './end.html'

export default {
  template,
  onMount () {
    setTimeout(_ => this.$router.push('/'), 2000)
  }
}
