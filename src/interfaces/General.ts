declare module SystemConfig {

    export interface MosaicConfig {
        id: string;
        name: string;
    }

    export interface NamespaceConfig {
        id: string;
        name: string;
    }

    export interface ConnectionNodesConfig {
        networkType: string;
        protocol: string;
        nodes: string[];
    }

    export interface NamespaceRentalFeeSinkConfig {
        name: string;
        address: string;
        publicKey: string;
    }

    export interface MosaicRentalFeeSinkConfig {
        name: string;
        address: string;
        publicKey: string;
    }

    export interface RentalFeeSinkConfig {
        namespaceRentalFeeSink: NamespaceRentalFeeSinkConfig;
        mosaicRentalFeeSink: MosaicRentalFeeSinkConfig;
    }

    export interface TESTNET {
        coin: string;
        mosaic: MosaicConfig;
        namespace: NamespaceConfig;
        connectionNodes: ConnectionNodesConfig;
        rentalFeeSink: RentalFeeSinkConfig;
        version: string;
    }

    export interface MAINNET {
        coin: string;
        mosaic: MosaicConfig;
        namespace: NamespaceConfig;
        connectionNodes: ConnectionNodesConfig;
        rentalFeeSink: RentalFeeSinkConfig;
        version: string;
    }


    export interface Environment {
        TESTNET: TESTNET;
        MAINNET: MAINNET;
    }

    export interface Default {
        version: string;
        environment: Environment;
    }

}


export default SystemConfig;