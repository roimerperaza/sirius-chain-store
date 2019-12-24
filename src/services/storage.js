class StorageService {

    storage = null;
    correlative = 'blstore'

    constructor(typeStorage) {
        this.storage = typeStorage
    }

    /**
     *
     *
     * @param {*} username
     * @param {*} password
     * @memberof StorageService
     */
    login(username, password) {
        const user = this.getUserByUsername(username);
        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    /**
     *
     *
     * @memberof StorageService
     */
    clear() {
        this.storage.clear()
    }

    /**
    *
    *
    * @param {*} item
    * @returns
    * @memberof StorageService
    */
    get(item) {
        return this.storage.getItem(`${this.correlative}-${item}`)
    }

    /**
    * Get users
    *
    * @memberof StorageService
    */
    getUsers() {
        let users = this.get(`users`);
        if (!users) {
            this.set(`users`, []);
            users = this.getUsers();
        }

        return users;
    }

    /**
     *
     *
     * @memberof StorageService
     */
    getUserByUsername(username) {
        const users = JSON.parse(this.getUsers());
        if (users && users.length > 0) {
            return users.find(x => x.username === username);
        }

        return null;
    }

    /**
     *
     *
     * @param {*} user
     * @memberof StorageService
     */
    saveUser(user) {
        const users = JSON.parse(this.getUsers());
        users.push(user);
        this.set(`users`, users);
        return true;
    }

    /**
     *
     *
     * @param {*} name
     * @param {*} item
     * @memberof StorageService
     */
    set(item, value) {
        let valueConverted = (typeof value === 'object' || typeof value === 'array') ? JSON.stringify(value) : value
        this.storage.setItem(`${this.correlative}-${item}`, valueConverted)
    }

}

export { StorageService }
