import generalMixins from '../mixins/general'
export default {
  mixins: [generalMixins],
  methods: {
    async createCredential(data) {
      const response = this.saveUser(data)
      if (response) {
        if (data.integrateSSI) {
          try {
            console.log('response', response)
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
      }

      return response
    },
    buildAccount(data, users) {
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
      if (!data.integrateSSI) {
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
    saveUser(data, update) {
      try {
        const users = this.getUsers()
        const currentUser = this.getByUsername(data.username)
        if (!update && !currentUser) {
          const response = this.buildAccount(data, users)
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