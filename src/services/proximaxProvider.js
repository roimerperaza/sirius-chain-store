import { BehaviorSubject } from 'rxjs'
import { crypto } from 'js-xpx-chain-library';
import {
  Account,
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
  NetworkType
} from 'tsjs-xpx-chain-sdk'

class ProximaxProvider {
  constructor(node, protocol, typeNetwork) {
    this.url = this.buildURL(node, protocol)
    this.typeNetwork = NetworkType[typeNetwork];
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
   * @param {*} [network=this.typeNetwork]
   * @returns
   * @memberof ProximaxProvider
   */
  createAccountSimple(walletName, password, network = this.typeNetwork) {
    return SimpleWallet.create(walletName, this.createPassword(password), network);
  }

  /**
   *
   *
   * @param {*} value
   * @returns
   * @memberof ProximaxProvider
   */
  createPassword(password) {
    return new Password(password);
  }

  /**
   *
   *
   * @param {*} privateKey
   * @param {*} network
   * @param {*} address
   * @returns
   * @memberof ProximaxProvider
   */
  checkAddress(privateKey, network, address) {
    return (Account.createFromPrivateKey(privateKey, network).address.plain() === address) ? true : false;
  }

  /**
   *
   *
   * @param {*} common
   * @param {*} account
   * @param {*} [network=this.typeNetwork]
   * @returns
   * @memberof ProximaxProvider
   */
  decrypt(common, account, network = this.typeNetwork) {
    try {
      if (account && account.encrypted !== '' && common) {
        console.log('SI PASO 2....', account, account.algo);
        if (!crypto.passwordToPrivatekey(common, account, account.algo)) {
          return { status: false, msg: 'Invalid password' };
        }

        console.log('SI PASO....');
        if (common.isHW) {
          return { status: true, msg: '' };
        }

        console.log('SI PASO 2....');

        if (!this.isPrivateKeyValid(common.privateKey) || !this.checkAddress(common.privateKey, network, account.address)) {
          return { status: false, msg: 'Invalid password' };
        }

        return { status: true, msg: '' };
      } else {
        return { status: false, msg: 'You do not have a valid account selected' };
      }
    } catch (error) {
      console.log(error)
      return { status: false, msg: 'You do not have a valid account selected.' };
    }
  }

  /**
   *
   *
   * @param {*} privateKey
   * @returns
   * @memberof ProximaxProvider
   */
  isPrivateKeyValid(privateKey) {
    if (privateKey.length !== 64 && privateKey.length !== 66) {
      // console.error('Private key length must be 64 or 66 characters !');
      return false;
    } else if (!this.isHexadecimal(privateKey)) {
      // console.error('Private key must be hexadecimal only !');
      return false;
    } else {
      return true;
    }
  }

  /**
   *
   *
   * @param {*} str
   * @returns
   * @memberof ProximaxProvider
   */
  isHexadecimal(str) {
    return str.match('^(0x|0X)?[a-fA-F0-9]+$') !== null;
  }
}

export { ProximaxProvider }