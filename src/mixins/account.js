import generalMixins from './general'
import webSocketProvider from './WebSocket';
export default {
  mixins: [generalMixins, webSocketProvider],
  methods: {
    async buildQRCode() {
      // build login login request message
      const loginRequestMessage = await this.$store.dispatch('siriusIDStore/createLoginMessage')
      // init websocket connection to verify login
      this.verifyToLogin(loginRequestMessage)
      // Generate and return QR code
      return await loginRequestMessage.generateQR()
    },
    async createCredential(data, onlyBuildQR) {
      const response = this.verifyUser(data, false, onlyBuildQR)
      if (response && onlyBuildQR) {
        try {
          const rsp = [response]
          for (let x of rsp) {
            delete x.simpleWallet
            delete x.algo
            delete x.integrateSSI
            delete x.dateBirth
            x['country'] = `${x.country.state}, ${x.country.code}`
          }
          const qr = await this.$store.dispatch('siriusIDStore/createCredential', rsp);
          return {
            qr,
            response
          }
        } catch (error) {
          console.log(error)
          return null
        }
      }

      return response
    },
    buildAccount(data, users, onlyBuildQR) {
      const toSave = {
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        algo: 'pass:bip32',
        country: data.country,
        dateBirth: data.dateBirth,
        integrateSSI: data.integrateSSI
      }

      toSave['simpleWallet'] = this.$blockchainProvider.createAccountSimple(data.username, data.password)
      if (!onlyBuildQR) {
        this.registerUser(toSave, users)
      }

      return toSave
    },
    decrypt(username, password) {
      const userData = this.getByUsername(username)
      if (userData) {
        const common = {
          password: password
        }
        const {
          address,
          encryptedPrivateKey
        } = userData.simpleWallet
        const account = {
          algo: 'pass:bip32',
          address: address['address'],
          encrypted: encryptedPrivateKey.encryptedKey,
          iv: encryptedPrivateKey.iv
        }

        const decrypt = this.$blockchainProvider.decrypt(common, account)
        if (decrypt && decrypt.status) {
          return userData
        }
      }

      return null
    },
    getByUsername(username) {
      const users = this.getUsers()
      if (users && users.length > 0) {
        return users.find(x => x.username === username)
      }

      return null
    },
    getUsers() {
      const users = this.$storage.get(`users`)
      if (!users) {
        this.$storage.set(`users`, [])
        return []
      }

      return JSON.parse(users)
    },
    verifyUser(data, update, onlyBuildQR) {
      try {
        const users = this.getUsers()
        const currentUser = this.getByUsername(data.username)
        if (!update && !currentUser) {
          const response = this.buildAccount(data, users, onlyBuildQR)
          return response
        } else if (update && currentUser) {
          const response = this.update(data, users, currentUser)
          return response
        }
        return null
      } catch (error) {
        return null
      }
    },
    registerUser(toSave, users) {
      users.push(toSave)
      this.$storage.set(`users`, users)
    },
    update(data, users, currentUser) {
      const toSave = {
        username: currentUser.username,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        algo: 'pass:bip32',
        country: data.country,
        dateBirth: data.dateBirth
      }
      toSave['simpleWallet'] = currentUser.simpleWallet
      const othersUsers = users.filter(x => x.username !== currentUser.username)
      othersUsers.push(toSave)
      this.$storage.set(`users`, othersUsers)
      return toSave
    }
  }
}