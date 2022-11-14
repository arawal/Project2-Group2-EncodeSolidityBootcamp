import { ethers, Wallet } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config()

async function main() {

    const provider = ethers.getDefaultProvider("goerli")
    let wallet: Wallet;

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
    const params = args.slice(2);
    const contractAddress = params[0];
    console.log(`query results for contract ${contractAddress}`);

    if (params.length <= 0) throw new Error("Not enough parameters");

    let ballotContract: Ballot;
    // create an instance of the contract using the 
    const ballotFactory = new Ballot__factory(signer);
    ballotContract = await ballotFactory.attach(contractAddress);
    console.log(`interacting with ${ballotContract.address}`);

    // call the delegate function on the contract
    const winnerName = await ballotContract.winnerName();
    console.log(`winner name: ${winnerName}`);

    const winninngProposal = await ballotContract.winningProposal();
    console.log(`winning proposal: ${winninngProposal}`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
