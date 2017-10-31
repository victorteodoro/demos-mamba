import './login.scss'
import template from './login.html'
import { Native, Util } from 'mamba-websdk'

Native.MbStatusbar.setBackgroundColor('#134bb8')
let Keyboard = Native.Keyboard
let secretPassword = '2017'

export default {
  template,
  onCreate () {
    let cpf = this.$refs['cpf'].el
    let password = this.$refs['password'].el
    let submitBtn = this.$refs['btn-submit'].el

    // Seta os campos como entradas numéricas
    cpf.onfocus = (e) => Keyboard.setKeyboardAsNumeric()
    password.onfocus = (e) => Keyboard.setKeyboardAsNumeric()

    // Estabele as funções chamadas quando se digita algo
    console.log(this)
    cpf.onkeydown = (e) => this._cpfMask(e, cpf, password)
    password.onkeydown = (e) => this._checkPassLength(e, cpf, password)

    // Verifica a senha e vai para a próxima página
    submitBtn.onclick = (e) => this._submit(e, password)
  },
  onMount () {
    this._reset()
  },
  onUnmount () {
    this._reset()
  },
  methods: {
    _reset () {
      this.$refs['cpf'].el.value = ''
      this.$refs['password'].el.value = ''
      this.$refs['btn-submit'].el.disabled = true
    },
    _checkPassLength (e, cpf, password) {
      if (password.value.length >= 3 && cpf.value.length > 10) {
        this.$refs['btn-submit'].el.disabled = false
      } else {
        this.$refs['btn-submit'].el.disabled = true
      }
    },
    _cpfMask (e, cpf, password) {
      let char = String.fromCharCode(e.keyCode || e.charCode)

      if (e.keyCode !== 8) {
        e.preventDefault()
      }

      if (Util.Num.isNumeric(char)) {
        let val = cpf.value
        if (val) {
          val = val.match(/\d/g).join('')
        } else {
          val = ''
        }
        val = val + char
        if (password.value.length >= 3 && cpf.value.length > 10) {
          this.$refs['btn-submit'].el.disabled = false
        } else {
          this.$refs['btn-submit'].el.disabled = true
        }
        if (val.length < cpf.getAttribute('maxlength')) {
          switch (val.length) {
            case 0:
            case 1:
            case 2:
              cpf.value = val
              break
            case 3:
              cpf.value = val + '.'
              break
            case 4:
            case 5:
              cpf.value = val.substring(0, 3) + '.' + val.substring(3)
              break
            case 6:
              cpf.value = val.substring(0, 3) + '.' + val.substring(3) + '.'
              break
            case 7:
            case 8:
              cpf.value = val.substring(0, 3) + '.' + val.substring(3, 6) + '.' + val.substring(6, 9)
              break
            case 9:
              cpf.value = val.substring(0, 3) + '.' + val.substring(3, 6) + '.' + val.substring(6, 9) + '-'
              break
            default:
              cpf.value = val.substring(0, 3) + '.' + val.substring(3, 6) + '.' + val.substring(6, 9) + '-' + val.substring(9)
              break
          }
        }
      }
    },
    _submit (e, password) {
      e.preventDefault()
      if (password.value === secretPassword) {
        this.$router.push('/welcome')
      } else {
        password.value = ''
        this.$refs['dialog-wrong-password'].open()
      }
    }
  }
}
