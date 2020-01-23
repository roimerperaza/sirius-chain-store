export const productsStore = {
    // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' 
    // instead of mounting getters, mutations, and actions to the root namespace.
    namespaced: true,
    state: {
        products: [{
            id: "0001",
            title: "BESTSELLERS",
            chip: [{
                name: "bestsellers",
                color: "terra"
            }],
            color: "",
            classDivider: "terra-divider",
            products: [{
                image: "1.jpg",
                title: "iPad Pro",
                rating: 4.5,
                totalRating: "415",
                usdAmount: "600.00",
                xpxAmount: "590,551.1811023622"
            }, {
                image: "2.jpg",
                title: "Dell 786i",
                rating: 7.3,
                totalRating: "813",
                usdAmount: "800.00",
                xpxAmount: "842,696.6292134832"
            }, {
                image: "3.jpg",
                title: "Sony TV-675i",
                rating: 1.3,
                totalRating: "80",
                usdAmount: "550.00",
                xpxAmount: "543,478.2608695652"
            }]
        }, {
            id: "0002",
            title: "NEW ARRIVALS",
            chip: [{
                name: "new arrivals",
                color: "primary"
            }],
            color: "",
            classDivider: "primary-divider",
            products: [{
                image: "5.jpg",
                title: "Sony D74v",
                rating: 4.9,
                totalRating: "477",
                usdAmount: "430.00",
                xpxAmount: "422,396.8565815324"
            }, {
                image: "6.jpg",
                title: "Canon 675-D",
                rating: 9.3,
                totalRating: "10",
                usdAmount: "340.00",
                xpxAmount: "333,988.21218074654"
            }, {
                image: "7.jpg",
                title: "Nikon",
                rating: 2.4,
                totalRating: "121",
                usdAmount: "400.00",
                xpxAmount: "392,927.30844793713"
            }]
        }]
    },
    getters: {
        getProducts: state => state.products
    },
    mutations: {

    },
    actions: {

    }
}