import { ethers, Wallet } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config()

// yarn run ts-node --files ./scripts/Delegate.ts deployedContractAddressHere addressToDelegateToHere


async function main() {
    // connect to goerli testnet, using the private key from .env
    // attach to an instance of the Ballot.sol contract and call the 
    const provider = ethers.getDefaultProvider("goerli")
    let wallet: Wallet;

    // check for accounts to use as signer in .env via mnemonic or private key
    if (process.env.MNEMONIC != "") {
        wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "")
    } else {
        wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    }
    const signer = wallet.connect(provider)
    const balanceBN = await signer.getBalance();

    console.log(`Connected to ${signer.address}`);
    console.log(`Balance: ${balanceBN.toString()} Wei`);

    const args = process.argv;
    console.log('args: ', args)
    const params = args.slice(2);
    const contractAddress = params[0];
    const delegateAddress = params[1];
    console.log(`delegating vote to ${delegateAddress} for contract ${contractAddress}`);

    if (params.length <= 0) throw new Error("Not enough parameters");

    let ballotContract: Ballot;
    // create an instance of the contract using the 
    const ballotFactory = new Ballot__factory(signer);
    ballotContract = await ballotFactory.attach(contractAddress);
    console.log(`interacting with ${ballotContract.address}`);

    // call the delegate function on the contract
    const tx = await ballotContract.delegate(delegateAddress);
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});