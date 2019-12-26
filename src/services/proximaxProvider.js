import { BehaviorSubject } from 'rxjs'
import {
  BlockHttp,
  ChainHttp,
  MosaicHttp,
  AccountHttp,
  NamespaceHttp,
  TransactionHttp,
  SimpleWallet,
  Password,
  DiagnosticHttp,
  MetadataHttp,
  Address
} from 'tsjs-xpx-chain-sdk'

class ProximaxProvider {
  constructor(node, protocol) {
    this.url = this.buildURL(node, protocol)
    // this.socketURL = new Listener(`${protocolWs}://${node}`, WebSocket)
    this.accountHttp = new AccountHttp(this.url)
    this.blockHttp = new BlockHttp(this.url)
    this.chainHttp = new ChainHttp(this.url)
    this.diagnosticHttp = new DiagnosticHttp(this.url)
    this.metadataHttp = new MetadataHttp(this.url)
    this.mosaicHttp = new MosaicHttp(this.url)
    this.namespaceHttp = new NamespaceHttp(this.url)
    this.transactionHttp = new TransactionHttp(this.url)
  }

  /**
   *
   *
   * @param {*} node
   * @param {*} protocol
   * @returns
   * @memberof ProximaxProvider
   */
  buildURL(node, protocol) {
    let url = null
    switch (protocol) {
      case 'http':
        url = `${protocol}://${node}:3000`
        break
      case 'https':
        url = `${protocol}://${node}:443`
        break
    }

    return url
  }

  /**
   *
   *
   * @param {*} walletName
   * @param {*} password
   * @param {*} network
   * @returns
   * @memberof ProximaxProvider
   */
  createAccountSimple(walletName, password, network) {
    return SimpleWallet.create(walletName, password, network);
  }

  /**
   *
   *
   * @param {*} value
   * @returns
   * @memberof ProximaxProvider
   */
  createPassword(value) {
    return new Password(value);
  }
}

export { ProximaxProvider }