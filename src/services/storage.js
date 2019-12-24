class StorageService {

    storage = null;
    correlative = 'blstore'

    constructor(typeStorage) {
        this.storage = typeStorage
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
    getAllUsers() {
        let users = this.get(`${this.correlative}-users`);
        if (!users) {
            this.set(`${this.correlative}-users`, []);
            users = this.get(`${this.correlative}-users`);
        }

        return users;
    }

    /**
     *
     *
     * @memberof StorageService
     */
    getUser(username) {
        const allUsers = JSON.parse(this.getAllUsers());
        if (allUsers && allUsers.length > 0) {
            return allUsers.find(x => x.username === username);
        }

        return null;
    }

    /**
     *
     *
     * @param {*} name
     * @param {*} item
     * @memberof StorageService
     */
    set(item, value) {
        let valueConverted = (typeof value === 'object') ? JSON.stringify(value) : value
        this.storage.setItem(`${this.correlative}-${item}`, valueConverted)
    }
}

export { StorageService }
