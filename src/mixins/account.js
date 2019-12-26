export default {
    methods: {
        decrypt(username, password) {
            const userData = this.getByUsername(username)
            if (userData) {
                const common = { password: password }
                const account = {
                    address: userData.simpleWallet.address['address'],
                    algo: 'pass:bip32',
                    encrypted: userData.simpleWallet.encryptedPrivateKey.encryptedKey,
                    iv: userData.simpleWallet.encryptedPrivateKey.iv,
                }

                const decrypt = this.$proximaxProvider.decrypt(common, account)
                if (decrypt) {
                    return userData;
                }
            }

            return null;
        },
        getByUsername(username) {
            const users = this.getUsers();
            if (users && users.length > 0) {
                return users.find(x => x.username === username);
            }

            return null;
        },
        getUsers() {
            const users = this.$storage.get(`users`);
            if (!users) {
                this.$storage.set(`users`, []);
                return [];
            }

            return JSON.parse(users);
        },
        saveUser(data) {
            try {
                const users = this.getUsers();
                if (!this.getByUsername(data.username)) {
                    const toSave = {
                        username: data.username,
                        name: data.name,
                        lastname: data.lastname,
                        email: data.email,
                        algo: 'pass:bip32'
                    }

                    toSave['simpleWallet'] = this.$proximaxProvider.createAccountSimple(data.username, data.password);
                    users.push(toSave);
                    this.$storage.set(`users`, users);
                    return toSave;
                }

                return null;
            } catch (error) {
                return null;
            }

        }
    }
};