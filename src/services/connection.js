import {
  AccountHttp,
  BlockHttp,
  DiagnosticHttp,
  ChainHttp,
  MetadataHttp,
  MosaicHttp,
  NamespaceHttp,
  TransactionHttp
} from 'tsjs-xpx-chain-sdk'

class Connections {
  constructor(node, protocol) {
    const url = this.getBuildUrl(node, protocol)
    console.log('URL ---->', url);
    this.accountHttp = new AccountHttp(node)
    this.blockHttp = new BlockHttp(node)
    this.chainHttp = new ChainHttp(node)
    this.diagnosticHttp = new DiagnosticHttp(node)
    this.metadataHttp = new MetadataHttp(node)
    this.mosaicHttp = new MosaicHttp(node)
    this.namespaceHttp = new NamespaceHttp(node)
    this.transactionHttp = new TransactionHttp(node)
  }

  getBuildUrl(node, protocol) {
    let url = null
    switch (protocol) {
      case 'http':
        url = `${protocol}://${node}:3000`
        break
      case 'https':
        url = `${protocol}://${node}:443`
        break
    }

    console.log('ESTA ES LA URL', url);
    return url
  }
}

export { Connections }
