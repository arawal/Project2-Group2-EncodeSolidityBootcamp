import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();


async function vote() {
    const provider = ethers.getDefaultProvider("goerli");
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    console.log(`Connected to the account of address ${signer.address}`);
    console.log(`The balance of this account is ${balanceBN.toString()} Wei`);

    const args = process.argv;
    const params = args.slice(3);
    const contractAddress = params[0];
    const targetAccount = params[1];
    const proposal = params[2];
    
    let ballotContract: Ballot;
    const ballotFactory = new Ballot__factory(signer);
    ballotContract = ballotFactory.attach(contractAddress);
    // something here to designate targetAccountAddressWithGIVENVotingRight???
    // example:  const tx = await ballotContract.giveRightToVote(targetAccount); Used in GiveRightToVote.ts
    const tx = await ballotContract.vote(proposal); //call vote function
    const receipt = await tx.wait();
    console.log({receipt});
}

vote().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// In bash shell, the command could be something like 

// yarn run ts-node --files ./scripts/Vote.ts deployedContractAddressHere targetAccountwithVotingRightsHere proposalNumber