## Configuration

*To be ran by the deployer `(owner)` of the contract*

After deployment the owner of the contract (the deploying account) must configure the contract with the address to the DGD token contract and the pro-rated amount of wei (0.000000000000000001 ETH) per nanoDGD (0.000000001 DGD) that will be refunded to the user.  

### Current Dissolution Rate

The current dissolution rate is calculated as follows: 

```
wei per DGD value 193124288 @ 386248576296155750000000 wei (386248.57629615575 ETH) in treasury
```

### Kovan 


```javascript
var acid = await Acid.deployed();
var dgdToken = '0xAca76c4e0748163dF74bc7E2d68Ba3F52753e9bc';
acid.init(193124288,dgdToken,{from: owner, gas: 300000, gasPrice web3.eth.toWei(20, 'gwei')});
```

### Ethereum Mainnet

```javascript
var acid = await Acid.deployed();
var dgdToken = '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a';
acid.init(193124288,dgdToken,{from: owner, gas: 300000, gasPrice web3.eth.toWei(20, 'gwei')});
```

