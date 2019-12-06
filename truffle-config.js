//const LightWalletProvider = require('@digix/truffle-lightwallet-provider');
const HDWalletProvider = require("truffle-hdwallet-provider");


const { KEYSTORE, PASSWORD } = process.env;

if (!KEYSTORE || !PASSWORD) { throw new Error('You must export KEYSTORE and PASSWORD (see truffle.js)'); }

module.exports = {
  networks: {
    kovan: {
      provider: new HDWalletProvider(
        "hard oppose there weapon input nerve tourist shadow absurd pottery enter fashion",
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
        "hard oppose there weapon input nerve tourist shadow absurd pottery enter fashion",
        'https://kovan.infura.io/',
        0,
        20
      ),
      gas: 10000000,
      gasPrice: 20 * (10 ** 9),
      network_id: '1',
    },
    development: {
      host: process.env.DOCKER ? 'ganache' : 'localhost',
      port: 8545,
      network_id: '*',
      gas: 7850000,
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
