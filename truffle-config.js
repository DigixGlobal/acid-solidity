const HDWalletProvider = require("@truffle/hdwallet-provider");


const { SECRET_MNEMONIC } = process.env;

if (!SECRET_MNEMONIC) { throw new Error('You must export MNEMONIC (see truffle-config.js)'); }

module.exports = {
  networks: {
    kovan: {
      provider: new HDWalletProvider(
        SECRET_MNEMONIC,
        'https://kovan.infura.io/v3/e6ba587382884a93bbe04b2ab0800085',
        0,
        20
      ),
      gas: 10000000,
      gasPrice: 20 * (10 ** 9),
      network_id: '42',
    },
    mainnet: {
      provider: new HDWalletProvider(
        SECRET_MNEMONIC,
        'https://mainnet.infura.io/v3/cc67a7ce67994f56b884d24179943047',
        0,
        20
      ),
      gas: 9950000,
      gasPrice: 55 * (10 ** 9),
      network_id: '1',
    },
    development: {
      host: process.env.DOCKER ? 'ganache' : 'localhost',
      port: 8545,
      network_id: '*',
      gas: 10000000,
    }
  },
  solc: {
    optimizer: {
      enabled: false,
    },
  },
  mocha: process.env.REPORT_GAS ? {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 21,
    },
  } : {},
};
