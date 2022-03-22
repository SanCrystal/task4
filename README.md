# task4
A simple page that interacts with a staking or vesting contract.


### Simple UI page for staking interaction [https://mystakingplatform.herokuapp.com/](https://mystakingplatform.herokuapp.com/)

### contract address : 0xE8b674438aD04D7C0fD162d106CCd1288989DDD2
#### [contract link to Rinkby etherscan](https://rinkeby.etherscan.io/address/0xE8b674438aD04D7C0fD162d106CCd1288989DDD2)

##### functions include
  - buyToken -- params(address)
  - stake
  - modifyTokenPrice onlyOwer params(newRate)
  - isStakeholder params(address)
  - distributeRewards onlyOwner
  - calculateReward params(address)
  - combinedRewards
  - rewardOf params(address)
  - removeStake params(address, stakeAmount)
  - createStake params(address, stakeAmount)
  - combinedStake
  - stakeOf params(address)
  - viewStakeholder params(address)
  - removeStakeholder params(address)
  - addStakeholder params(address)

