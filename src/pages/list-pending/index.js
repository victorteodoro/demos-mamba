import './confirm.scss'
import template from './confirm.html'

export default {
  template,
  onCreate () {
    this.$refs['cancel-everything'].el.onclick = _ => this.$refs['cancel'].open(_ => this.$router.push('/'))
    this.$refs['confirm-everything'].el.onclick = _ => {
      this.$refs['print-area'].print(this.printObject, err => {
        if (err === undefined) {
          this.$router.push('/end')
        } else {
          this.$router.push('/printingError')
        }
      })
    }
  }
}
