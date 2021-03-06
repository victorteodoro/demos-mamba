import { Mamba, Native, Util } from 'mamba-websdk'
import EventSystem from './event'

let MbDialog = Mamba.$components['mb-dialog']
let showingPasswordDialog = false

function configureHttpReq (functionName, url) {
  let xhttpObj = new window.XMLHttpRequest()
  xhttpObj.open('POST', url, true)
  xhttpObj.withCredentials = false
  xhttpObj.setRequestHeader('Access-Control-Allow-Origin', '*')
  xhttpObj.setRequestHeader('Content-Type', 'application/json')
  xhttpObj.setRequestHeader('token', 'eyJhbGdvcml0aG0iOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJVc2VybmFtZSI6ImJydW5vdGVzdGUiLCJQYXNzd29yZCI6IjEyMzQ1NiJ9.Xg4vcjek6EMmGkLpOvPSy-R-17JSSUBUMeFMPlo0bo8')
  xhttpObj.onprogress = (data) => 'Requesting from ' + functionName + '...'
  xhttpObj.onerror = (data) => 'Error Status: ' + xhttpObj.status
  return xhttpObj
}

function configurePasswordButtonEnabling (e, passElement, btnElement) {
  if (!(passElement instanceof window.HTMLElement)) passElement = passElement.el
  if (!(btnElement instanceof window.HTMLElement)) btnElement = btnElement.el
  if (passElement.value.length === 4) {
    btnElement.disabled = false
  } else {
    btnElement.disabled = true
  }
  if (e.keyCode === 13) {
    btnElement.click()
  }
}

function verifyPassword (password) {
  return Native.MbMerchant.checkPassword(password)
}

function configurePasswordEvent (passInput, callback, context) {
  if (!(passInput instanceof window.HTMLElement)) passInput = passInput.el
  if (verifyPassword(passInput.value)) {
    callback.call(context)
  } else if (!showingPasswordDialog) {
    let errorDialog = Mamba.createComponent(MbDialog, {
      props: {
        mbTitle: 'Senha não confere',
        mbPositiveAction: 'Ok',
        mbHideNegativeAction: true
      }
    })
    errorDialog.mount(context.el)
    errorDialog.open(_ => {
      errorDialog.destroy()
      showingPasswordDialog = false
    })
    showingPasswordDialog = true
  }
}

function displayError (messageList, container, closeCallback) {
  var errorCodes = ''
  var errorMessages = ''
  messageList.map((messageList) => {
    errorCodes = errorCodes + ', ' + messageList.Code
    errorMessages = errorMessages + messageList.Message + '\n'
  })
  errorCodes = errorCodes.substring(2)
  let errorPlural = 'Erro'
  if (messageList.length > 1) errorPlural = 'Erros'
  let errorDialog = Mamba.createComponent(MbDialog, {
    props: {
      mbTitle: errorPlural + ': ' + errorCodes,
      mbPositiveAction: 'Ok',
      mbHideNegativeAction: true
    }
  })
  errorDialog.el.querySelector('.mb-dialog-message').innerText = errorMessages
  errorDialog.mount(container)
  errorDialog.open(_ => {
    if (closeCallback !== undefined) closeCallback.call()
    Mamba.$router.push('/antecipacao-pontual')
    errorDialog.destroy()
  })
}

function displayServerError (container, closeCallback) {
  let errorDialog = Mamba.createComponent(MbDialog, {
    props: {
      mbTitle: 'Erro de Conexão',
      mbPositiveAction: 'Sair',
      mbNegativeAction: 'Retornar'
    }
  })
  errorDialog.el.querySelector('.mb-dialog-message').innerText = 'Erro na comunicação. Por favor, cheque sua conexão ou entre em contato com o RC.'
  errorDialog.mount(container)
  errorDialog.open((action) => {
    if (action === errorDialog.negativeAction) {
      Mamba.$router.push('/antecipacao-pontual')
      EventSystem.emit('connectionError')
    } else {
      Native.App.close()
    }
  })
}

function moneyMask (e, field, enterCallback) {
  e.preventDefault()
  let char = String.fromCharCode(e.keyCode || e.charCode)
  let val = field.value
  if (val) {
    val = val.match(/\d/g).join('')
  } else {
    val = ''
  }
  switch (e.keyCode) {
    case 8:
      // BACKSPACE
      val = val.slice(0, -1)
      field.value = Util.Money.formatCurrency('R$', val)
      break
    case 27:
      // CLOSE
      Native.App.close()
      break
    default:
      if (Util.Num.isNumeric(char)) {
        val = Number(val + char)
        field.value = Util.Money.formatCurrency('R$', val)
      }
      break
  }
}

function preventDefault (event) {
  // bypass esc key only
  if (event.keyCode !== 27) event.preventDefault()
}

let tools = {
  configureHttpReq,
  configurePasswordButtonEnabling,
  configurePasswordEvent,
  displayError,
  displayServerError,
  moneyMask,
  preventDefault
}

export default tools
