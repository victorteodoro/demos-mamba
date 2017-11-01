import './list-pending.scss'
import template from './list-pending.html'
import Tools from '../../shared/tools'

let thisObject = null
let proposals = null
let filipetaParceiro = null
let filipetaAmbev = null
let router = null

export default {
  template,
  state () {
    return {
      printObject: {
        user_dithering: false,
        scale_to_paper_width: true
      }
    }
  },
  onCreate () {
    // Obtém a lista de operações
    setTimeout(this._listProposals, 10)
    thisObject = this

    router = this.$router
    filipetaParceiro = this.$refs['filipeta-parceiro']
    filipetaAmbev = this.$refs['filipeta-ambev']
  },
  methods: {
    _appendToMbCollection (response) {
      proposals = response.ResponseData.Proposals
      for (let proposal of proposals) {
        this.$refs['proposals-list'].innerHTML += '<span class="mb-collection-item-description"></span> <div class="mb-collection-right mb-icon " style="display: none;"></div> <div class="mb-ink"></div> </span>  <span class="mb-collection-item has-right-icon" id="proposalId' + proposal.ProposalID + '"> <div class="mb-collection-left mb-icon " style="display: none;"></div><span class="mb-collection-item-text"> <span></span>' + 'R$ ' + proposal.Amount.toFixed(2) + ' (' + proposal.ProposalStatus + ')' + '</span> <span class="mb-collection-item-description"></span> <div class="mb-collection-right mb-icon mb-icon-chevron-right"></div> <div class="mb-ink"></div></span>'
      }
    },
    _addClickListeners () {
      for (let i = 4; i < this.$refs['proposals-list'].children.length; i += 4) {
        this.$refs['proposals-list'].children[i].onclick = (event) => {
          console.log(event.srcElement.id.substring(10, 11))
          for (let proposal of proposals) {
            if (proposal.ProposalID === '3') {
              this.$refs['amount'].innerText = 'R$ ' + proposal.Amount.toFixed(2)
              this.$refs['proposal-id'].innerText = proposal.ProposalID
              this.$refs['recipient-name'].innerText = proposal.RecipientName
              this.$refs['proposal-status'].innerText = proposal.ProposalStatus
              let dialogPendingOperation = this.$refs['dialog-pending-operation']
              dialogPendingOperation.open()
              dialogPendingOperation.$refs['mbPositiveAction'].onclick = (event) => {
                filipetaParceiro.print(this.printObject, err => {
                  if (err === undefined) {
                    setTimeout(function () {
                      filipetaAmbev.print(this.printObject, err => {
                        if (err === undefined) {
                          router.push('/welcome')
                        } else {
                          console.log('Printing error!')
                        }
                      })
                    }, 100)
                  } else {
                    console.log('Printing error!')
                  }
                })
              }
            }
          }
        }
      }
    },
    _listProposals () {
      let xhttp = Tools.configureHttpReq('ravTotal advance', 'http://private-anon-9cdddf7186-garantiafornecedorv3.apiary-mock.com/api/ListProposals')
      xhttp.onreadystatechange = response => {
        if (xhttp.readyState === 4) {
          let responseJSON = JSON.parse(response.currentTarget.responseText)
          thisObject._appendToMbCollection(responseJSON)
          thisObject._addClickListeners()
        } else {
          Tools.displayServerError(this.el)
        }
      }
      xhttp.send(JSON.stringify({
        'MerchantStoneCode': '0123456789',
        'ProposalStatus': 'Accepted',
        'InitDate': '2017-01-01',
        'EndDate': '2017-01-02'
      }))
    }
  }
}
