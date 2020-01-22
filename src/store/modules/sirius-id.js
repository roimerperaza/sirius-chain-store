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
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async createCredential() {
            let content = new Map([
                ['hola', 'mundo']
            ])
            let id = 'blockchain-store';
            let name = 'Blockchain Store';
            let description = 'Blockchain store with catapult blockchain';
            let icon = '';
            let documentHash = [];

            // Private key of dApp where created this credential
            let privateKey = "3401374277C42290570A8B88B86BCFCC190DF7808B4F14079F798B0F7D66B9EE";
            // Option - to protect this credential from other fake applications
            let authOrigin = Credentials.authCreate(content, privateKey);
            const credential = Credentials.create(
                id,
                name,
                description,
                icon,
                documentHash,
                content,
                authOrigin
            );

            let message = CredentialRequestMessage.create(credential);
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