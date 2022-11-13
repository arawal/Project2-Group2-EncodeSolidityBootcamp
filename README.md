# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Contract Details
Network: `Goerli Testnet`

Deployed Contract Address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

## Running the scripts

### Delegate a vote to a new address

```bash
npx run ts-node --files scripts/Delegate.ts "<address of deployed contract>" "<address to delegate to>"
or
yarn run ts-node --files scripts/Delegate.ts "<address of deployed contract>" "<address to delegate to>"
```

### Template for your own script

```bash
npx run ts-node --files scripts/<your-script>.ts <arguments-ifNoneLeaveBlank>
or
yarn run ts-node --files scripts/<your-script>.ts <arguments-ifNoneLeaveBlank>
```

# Weekend Project
* Form groups of 3 to 5 students
* Develop and run scripts for “Ballot.sol” within your group to give voting rights, casting votes, delegating votes and querying results
* Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
* Submit your code in a github repository in the form
