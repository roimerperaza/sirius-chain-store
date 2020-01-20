export default {
  methods: {
    decrypt (username, password) {
      const userData = this.getByUsername(username)
      if (userData) {
        const common = { password: password }
        const { address, encryptedPrivateKey } = userData.simpleWallet
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
    getByUsername (username) {
      const users = this.getUsers()
      if (users && users.length > 0) {
        return users.find(x => x.username === username)
      }

      return null
    },
    getUsers () {
      const users = this.$storage.get(`users`)
      if (!users) {
        this.$storage.set(`users`, [])
        return []
      }

      return JSON.parse(users)
    },
    saveUser (data, update) {
      try {
        const users = this.getUsers()
        const currentUser = this.getByUsername(data.username)
        if (!update && !currentUser) {
          const response = this.register(data, users)
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
    register (data, users) {
      const toSave = {
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        algo: 'pass:bip32',
        country: data.country,
        dateBirth: data.dateBirth
      }
      toSave['simpleWallet'] = this.$blockchainProvider.createAccountSimple(data.username, data.password)
      users.push(toSave)
      this.$storage.set(`users`, users)
      return toSave
    },
    update (data, users, currentUser) {
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
