class StorageService {

    storage: Storage;
    correlative = 'blstore'

    constructor(typeStorage: Storage) {
        this.storage = typeStorage
    }

    /**
     *
     *
     * @param {*} username
     * @param {*} password
     * @memberof StorageService
     */
    login(username: any, password: any) {
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
    get(item: string) {
        return this.storage.getItem(`${this.correlative}-${item}`)
    }

    /**
    * Get users
    *
    * @memberof StorageService
    */
    getUsers(): any {
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
    getUserByUsername(username: any) {
        const users = JSON.parse(this.getUsers());
        if (users && users.length > 0) {
            return users.find((x: { username: any; }) => x.username === username);
        }

        return null;
    }

    /**
     *
     *
     * @param {*} user
     * @memberof StorageService
     */
    saveUser(user: any) {
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
    set(item: string, value: any) {
        let valueConverted = (typeof value === 'object') ? JSON.stringify(value) : value
        this.storage.setItem(`${this.correlative}-${item}`, valueConverted)
    }

}

export { StorageService }
