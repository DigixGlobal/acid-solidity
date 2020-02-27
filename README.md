# NOTE: THESE INSTRUCTIONS ARE FOR DEVELOPERS ONLY.  DO NOT FOLLOW THESE FOR CLAIMING ON THE ETHEREUM MAIN NETWORK

# Acid - DigixDAO Dissolution Contract

## Introduction

This is a simple contract that burns DigixDAO tokens in exchange for a pro-rated amount of ETH.

## Configuration

The deployer of the contract must configure and fund the contract.  Please see the [configuration](https://github.com/DigixGlobal/acid-solidity/blob/master/DEPLOYMENT.md) steps.

## Refund Steps - Kovan

### Approve dissolution contract on your DGD account

Load your DGD Address on MyCrypto.com and send a custom transaction using the following parameters

| Field | Value |
|-------|-------|
| To | [0xAca76c4e0748163dF74bc7E2d68Ba3F52753e9bc](https://kovan.etherscan.io/token/0xAca76c4e0748163dF74bc7E2d68Ba3F52753e9bc#balances) |
| Value | `0` |
| Data | `0x095ea7b30000000000000000000000000c516b62d0c8188434934a477c6f68d294c2158b00000000000000000000000000000000000000000000000000071afd498d0000`  |
| Gas Limit | `1000000` |


### Burn your DGD for ETH

Load your DGD Address on MyCrypto.com and send a custom transaction using the following parameters

| Field | Value |
|-------|-------|
| To | [0x0c516B62d0c8188434934A477c6f68D294C2158b](https://kovan.etherscan.io/address/0x0c516B62d0c8188434934A477c6f68D294C2158b#code) |
| Value | `0` |
| Data | `0x44df8e70` |
| Gas Limit | `1500000` |

## Refund Steps - Mainnet

### Approve dissolution contract on your DGD account

Load your DGD Address on MyCrypto.com and send a custom transaction using the following parameters

| Field | Value |
|-------|-------|
| To | [0xe0b7927c4af23765cb51314a0e0521a9645f0e2a](https://etherscan.io/token/0xe0b7927c4af23765cb51314a0e0521a9645f0e2a) |
| Value | `0` |
| Data | `0x095ea7b300000000000000000000000023Ea10CC1e6EBdB499D24E45369A35f43627062f00000000000000000000000000000000000000000000000000071afd498d0000`  |
| Gas Limit | `1000000` |


### Burn your DGD for ETH

Load your DGD Address on MyCrypto.com and send a custom transaction using the following parameters

| Field | Value |
|-------|-------|
| To | `0x23Ea10CC1e6EBdB499D24E45369A35f43627062f` |
| Value | `0` |
| Data | `0x44df8e70` |
| Gas Limit | `1500000` |

# Testing

To run the tests perform the following:


1. Start ganache-cli using the provided script in a separate terminal window

```
npm install
export SECRET_MNEMONIC="daring ancient august state diamond gift current kid reopen unit derive destroy"
./scripts/start_ganache.sh
```

2. Run the tests

```
npm install
export SECRET_MNEMONIC="daring ancient august state diamond gift current kid reopen unit derive destroy"
./node_modules/.bin/truffle test
```

