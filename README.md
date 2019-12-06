# Acid - DigixDAO Dissolution Contract

## Introduction

This is a simple contract that burns DigixDAO tokens in exchange for a pro-rated amount of ETH.

## Deployer Step - Configuration

*To be ran by the deployer of the contract*

After deployment the owner of the contract (the deploying account) must configure the contract with the address to the DGD token contract and the pro-rated amount of wei (0.000000000000000001 ETH) per nanoDGD (0.000000001 DGD) that will be refunded to the user.  

```javascript
var acid = await Acid.deployed();
// Replace with the owner
var owner = '0x440db3AB842910D2a39F4e1be9E017C6823Fb658';
// wei per DGD value 193124288 @ 386248576296155750000000 wei (386248.57629615575 ETH) in treasury
acid.init(193124288,0xe0b7927c4af23765cb51314a0e0521a9645f0e2a).sendTransaction({from: owner, gas: 300000, gasPrice web3.eth.toWei(20, 'gwei')});
```

## Refund Steps

### Approve dissolution contract on your DGD account

Load your DGD Address on MyCrypto.com and send a custom transaction using the following parameters

| Field | Value |
|-------|-------|
| To | `0xe0b7927c4af23765cb51314a0e0521a9645f0e2a` |
| Value | `0` |
| Data | `0x095ea7b30000000000000000000000007908cef1344929f7b5c111375104b510db481add00000000000000000000000000000000000000000000000000071afd498d0000` (Kovan Data) |
| Gas Limit | `1000000` |


### Burn your DGD for ETH

Load your DGD Address on MyCrypto.com and send a custom transaction using the following parameters

| Field | Value |
|-------|-------|
| To | `0x7908Cef1344929F7B5c111375104B510db481ADd` (Kovan Address) |
| Value | `0` |
| Data | `0x44df8e70` |
| Gas Limit | `1500000` |
