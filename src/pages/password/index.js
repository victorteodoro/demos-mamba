import './password.scss'
import template from './password.html'
import { Native } from 'mamba-websdk'

let Keyboard = Native.Keyboard
let password = '111111'

export default {
  template,
  onCreate () {
    let inputEl = this.$refs['card-password']
    let submitBtnEl = this.$refs['btn-password-submit'].el

    inputEl.onfocus = (e) => Keyboard.setKeyboardAsNumeric()
    inputEl.onkeyup = (e) => this._passwordValidation(e, inputEl)
    submitBtnEl.onclick = (e) => this._submit(e, inputEl)
  },
  onMount () {
    this._reset()
  },
  onUnmount () {
    this._reset()
  },
  methods: {
    _reset () {
      this.$refs['card-password'].value = ''
      this.$refs['btn-password-submit'].el.disabled = true
    },
    _passwordValidation (e, inputEl) {
      let passLenght = inputEl.value.length
      if (passLenght < 4) {
        this.$refs['btn-password-submit'].el.disabled = true
      } else if (passLenght <= 6) {
        this.$refs['btn-password-submit'].el.disabled = false
      }
    },
    _submit (e, inputEl) {
      let val = inputEl.value
      if (val === password) {
        this.$router.push('/remove')
      } else {
        inputEl.value = ''
        this.$refs['btn-password-submit'].el.disabled = true
        this.$refs['password-error'].open()
      }
    }
  }
}
