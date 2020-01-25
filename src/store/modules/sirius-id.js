import {
    LoginRequestMessage,
    Credentials,
    CredentialRequestMessage
} from 'siriusid-sdk';
import {
    WebSocketProvider
} from '../../services/WebSocket';

export const siriusIDStore = {
    // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' 
    // instead of mounting getters, mutations, and actions to the root namespace.
    namespaced: true,
    state: {
        id: 'blockchain-store',
        name: 'Blockchain Store',
        description: 'Blockchain store with catapult blockchain',
        icon: '',
        documentHash: [],
        // Private key of dApp where created this credential
        privateKey: "3401374277C42290570A8B88B86BCFCC190DF7808B4F14079F798B0F7D66B9EE"
    },
    getters: {},
    mutations: {},
    actions: {
        async createCredential({commit, state}, data) {
            console.log(data)
            const content = new Map(data)
            // Option - to protect this credential from other fake applications
            const authOrigin = Credentials.authCreate(content, state.privateKey);
            const credential = Credentials.create(
                state.id,
                state.name,
                state.description,
                state.icon,
                state.documentHash,
                content,
                authOrigin
            );

            const message = CredentialRequestMessage.create(credential);
            // Using SiriusID to scan this message and store this credential
            return await message.generateQR()
        },
        async createLoginMessage() {
            //public key of application
            const publicKey = "357966ED5562BAEBF4CBF9D4CB1C7EC30F910C9ADC1B72093C6FEBAF9A75A8C7";
            const credentialRequriredList = ['blockchain-store'];
            const loginRequestMessage = LoginRequestMessage.create(publicKey, credentialRequriredList);
            //Using SiriusID to scan this message and send it to login
            return await loginRequestMessage.generateQR()
        },
        initWebsocket() {
            console.log(WebSocketProvider)
        }
    }
}