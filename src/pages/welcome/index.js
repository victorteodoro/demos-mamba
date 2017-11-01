import './welcome.scss'
import template from './welcome.html'

export default {
  template,
  onMount () {
    this.$refs['list-pending'].el.onclick = (event) => {
      this.$router.push('/list-pending')
    }
  }
}
