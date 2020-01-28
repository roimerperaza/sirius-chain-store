import {
  BehaviorSubject
} from 'rxjs'
import {
  Listener,
  Address
} from 'tsjs-xpx-chain-sdk'
import {
  VerifytoLogin
} from 'siriusid-sdk'

export default {
  created() {
    if (this.$environment) {
      const protocol = this.$environment.connectionNodes.protocolWs
      const node = this.$environment.connectionNodes.nodes[Math.floor(Math.random() * this.$environment.connectionNodes.nodes.length)]
      this.url = `${protocol}://${node}`
    }
  },
  beforeDestroy() {
    this.closeConection()
  },
  data: () => ({
    audio: new Audio('assets/audio/ding.ogg'),
    audio2: new Audio('assets/audio/ding2.ogg'),
    url: '',
    interval: '',
    listener: ''
  }),
  methods: {
    closeConection() {
      if (this.listener.length > 0) {
        this.listener.forEach(element => {
          element.close()
          element.terminate()
        })
      }
    },
    getBlock(listener, address, audio) {
      listener.newBlock(address).subscribe(block => {
        // audio.play()
        console.log("--------------------NEW_BLOCK------------------------", block)
      })
    },
    getAggregateBondedAdded(listener, address, audio) {
      listener.aggregateBondedAdded(address).subscribe(aggregateBondedAdded => {
        audio.play()
        console.log("--------------------AGGREGATE_BONDED_ADDED------------------------")
        console.log(aggregateBondedAdded.transactionInfo.hash)
        console.log("------------------------------------------------------------------\n\n")
      })
    },
    getAggregateBondedRemoved(listener, address, audio) {
      listener.aggregateBondedRemoved(address).subscribe(getAggregateBondedRemoved => {
        audio.play()
        console.log("-----------------------AGGREGATE_BONDED_REMOVED--------------------------")
        console.log(getAggregateBondedRemoved)
        console.log("------------------------------------------------------------------\n\n")
      })
    },
    getCosignatureAdded(listener, address, audio) {
      listener.cosignatureAdded(address).subscribe(cosignatureAdded => {
        audio.play()
        console.log("-----------------------COSIGNATURE_ADDED--------------------------")
        console.log(cosignatureAdded)
        console.log("------------------------------------------------------------------\n\n")
      })
    },
    getConfirmed(listener, address, audio) {
      listener.confirmed(address).subscribe(confirmedTransaction => {
        audio.play()
        console.log(" -----------------------CONFIRMED---------------------------------")
        console.log(confirmedTransaction.transactionInfo.hash)
        console.log("------------------------------------------------------------------ \n\n")
      })
    },
    getUnConfirmedAdded(listener, address, audio) {
      listener.unconfirmedAdded(address).subscribe(unconfirmedAdded => {
        audio.play()
        console.log("-----------------------UNCONFIRMED_ADDED--------------------------")
        console.log(unconfirmedAdded)
        console.log("------------------------------------------------------------------\n\n")
      })
    },
    getUnConfirmedRemoved(listener, address, audio) {
      listener.unconfirmedRemoved(address).subscribe(unconfirmedRemoved => {
        audio.play()
        console.log("-----------------------UNCONFIRMED_REMOVED--------------------------")
        console.log(unconfirmedRemoved)
        console.log("------------------------------------------------------------------\n\n")
      })
    },
    getStatus(listener, address, audio) {
      listener.status(address).subscribe(status => {
        audio.play()
        console.log("-----------------------STATUS--------------------------")
        console.log(status.hash)
        console.log(status)
        console.log("------------------------------------------------------------------\n\n")
      })
    },
    openConnection(address) {
      return new Promise((resolve, reject) => {
        const rawAddress = this.$blockchainProvider.createFromRawAddress(address)
        const listener = new Listener(this.url, WebSocket)
        console.log('listener', listener)
        listener.open().then(() => {
          this.listener.push(listener)
          // this.getAggregateBondedAdded(listener, rawAddress, this.audio)
          // this.getAggregateBondedRemoved(listener, rawAddress, this.audio2)
          // this.getCosignatureAdded(listener, rawAddress, this.audio)
          this.getConfirmed(listener, rawAddress, this.audio)
          this.getUnConfirmedAdded(listener, rawAddress, this.audio2)
          this.getUnConfirmedRemoved(listener, rawAddress, this.audio2)
          this.getStatus(listener, rawAddress, this.audio2)
          resolve(true)
        }, (error) => {
          console.log('Error connecting to the node')
          reject(false) // Error
        })
      }, () => {
        reject(false) // Error
      })
    },
    verifyToLogin(loginRequestMessage) {
      const pvk = this.$store.getters['siriusIDStore/pvk']
      const credential = this.$store.getters['siriusIDStore/credential']
      const account = this.$blockchainProvider.createFromPrivateKey(pvk)
      const sessionToken = loginRequestMessage.getSessionToken()
      this.listener = new Listener(this.url, WebSocket)
      // this.waiting(loginRequestMessage, privateKey)
      this.listener.open().then(() => {
        console.log('account --->', account.address)
        this.getBlock(this.listener, account.address, null)
        let subscribe = this.listener.confirmed(account.address).subscribe(transaction => {
          console.log('new txn --->', transaction)
          if (VerifytoLogin.verify(transaction, sessionToken, credential, pvk)) {
            console.log("Transaction matched")
            console.log(VerifytoLogin.getMessage())
            this.$store.commit('accountStore/LOGIN_FROM_SSID', true)
            subscribe.unsubscribe()
            this.closeConection()
          } else console.log("Transaction not match")
        })
      })
    },
    // waiting(loginRequestMessage, privateKey) {
    //   this.interval = setInterval(async () => {
    //     const listenerAsAny = this.listener;
    //     console.log(listenerAsAny.webSocket.readyState);
    //     if (listenerAsAny.webSocket.readyState !== 1) {
    //       clearInterval(this.interval);
    //       this.listener.close();
    //       this.listener.terminate();
    //       this.verifytoLogin(loginRequestMessage, privateKey);
    //     }
    //   }, 5000);
    // }
  }
}