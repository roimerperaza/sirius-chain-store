export default {
    methods: {
        decrypt(username, password) {
            const userData = this.getByUsername(username)
            if (userData) {
                const common = { password: password }
                const { address, encryptedPrivateKey } = userData.simpleWallet
                const account = {
                    algo: 'pass:bip32',
                    address: address['address'],
                    encrypted: encryptedPrivateKey.encryptedKey,
                    iv: encryptedPrivateKey.iv,
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
        saveUser(data) {
            try {
                const users = this.getUsers()
                const { username, name, lastname, email, password, country, dateBirth } = data
                if (!this.getByUsername(username)) {
                    const toSave = { username, name, lastname, email, algo: 'pass:bip32', country, dateBirth }
                    toSave['simpleWallet'] = this.$blockchainProvider.createAccountSimple(username, password)
                    users.push(toSave)
                    this.$storage.set(`users`, users)
                    return toSave
                }

                return null
            } catch (error) {
                return null
            }

        }
    }
}