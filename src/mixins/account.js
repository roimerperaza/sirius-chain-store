export default {
    methods: {
        login(username, password) {
            const user = this.getByUsername(username);
            if (user && user.password === password) {
                return user;
            }
    
            return null;
        },
        getByUsername(username) {
            const users = JSON.parse(this.getUsers());
            if (users && users.length > 0) {
                return users.find(x => x.username === username);
            }
    
            return null;
        },
        getUsers() {
            let users = this.$storage.get(`users`);
            if (!users) {
                this.set(`users`, []);
                users = this.getUsers();
            }
    
            return users;
        },
        saveUser(user) {
            const users = JSON.parse(this.getUsers());
            users.push(user);
            this.$storage.set(`users`, users);
            return true;
        }
    }
};