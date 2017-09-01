import './welcome.scss'
import template from './welcome.html'
import { Native, Util } from 'mamba-websdk'

Native.MbStatusbar.setBackgroundColor('#262626')
let Keyboard = Native.Keyboard
let cpf = '11111111111'

export default {
  template,
  onCreate () {
    let inputEl = this.$refs['input'].el
    let submitBtnEl = this.$refs['btn-submit'].el

    inputEl.onfocus = (e) => Keyboard.setKeyboardAsNumeric()
    inputEl.onkeydown = (e) => this._cpfMask(e, inputEl)
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
      this.$refs['input'].el.value = ''
      this.$refs['btn-submit'].el.disabled = true
    },
    _cpfMask (e, inputEl) {
      let char = String.fromCharCode(e.keyCode || e.charCode)

      if (e.keyCode !== 8) {
        e.preventDefault()
      }

      if (Util.Num.isNumeric(char)) {
        let val = inputEl.value
        if (val) {
          val = val.match(/\d/g).join('')
        } else {
          val = ''
        }
        val = val + char
        if (val.length > 10) {
          this.$refs['btn-submit'].el.disabled = false
        } else {
          this.$refs['btn-submit'].el.disabled = true
        }
        if (val.length < inputEl.getAttribute('maxlength')) {
          switch (val.length) {
            case 0:
            case 1:
            case 2:
              inputEl.value = val
              break
            case 3:
              inputEl.value = val + '.'
              break
            case 4:
            case 5:
              inputEl.value = val.substring(0, 3) + '.' + val.substring(3)
              break
            case 6:
              inputEl.value = val.substring(0, 3) + '.' + val.substring(3) + '.'
              break
            case 7:
            case 8:
              inputEl.value = val.substring(0, 3) + '.' + val.substring(3, 6) + '.' + val.substring(6, 9)
              break
            case 9:
              inputEl.value = val.substring(0, 3) + '.' + val.substring(3, 6) + '.' + val.substring(6, 9) + '-'
              break
            default:
              inputEl.value = val.substring(0, 3) + '.' + val.substring(3, 6) + '.' + val.substring(6, 9) + '-' + val.substring(9)
              break
          }
        }
      }
    },
    _submit (e, inputEl) {
      e.preventDefault()
      let val = inputEl.value.match(/\d/g).join('')
      if (val === cpf) {
        this.$router.push('/payment')
      } else {
        inputEl.value = ''
        this.$refs['dialog-user-not-found'].open()
      }
    }
  }
}
