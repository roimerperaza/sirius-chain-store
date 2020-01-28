import {
    LoginRequestMessage,
    Credentials,
    CredentialRequestMessage
} from 'siriusid-sdk';
export const siriusIDStore = {
    // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' 
    // instead of mounting getters, mutations, and actions to the root namespace.
    namespaced: true,
    state: {
        id: 'sirius-chain-store',
        name: 'Sirius Chain Store',
        description: 'Store with ProximaX Sirius Chain',
        icon: '',
        documentHash: [],
        // Private key of dApp where created this credential
        privateKey: "3401374277C42290570A8B88B86BCFCC190DF7808B4F14079F798B0F7D66B9EE",
        //public key of application
        publicKey: "86E0ECB51AD6A5B773B75AA4B1AF3744C08BD1D8A441A3F34F26C326C0A9DC37"
    },
    getters: {
        pvk: state => state.privateKey,
        credential: state => [state.id]
    },
    mutations: {},
    actions: {
        async createCredential({state}, data) {
            const x = Object.entries(data[0])
            const content = new Map(x)
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
        createLoginMessage({state}) {
            // All credentials required
            const credentialRequriredList = [state.id];
            // build login request message
            const loginRequestMessage = LoginRequestMessage.create(state.publicKey, credentialRequriredList);
            // Using SiriusID to scan this message and send it to login
            return loginRequestMessage
        }
    }
}