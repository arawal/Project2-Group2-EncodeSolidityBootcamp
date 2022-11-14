import { ethers, Wallet } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function giveRightToVote() {
    const provider = ethers.getDefaultProvider("goerli");
    let wallet: Wallet;
    if (process.env.MNEMONIC == undefined && process.env.PRIVATE_KEY == undefined) throw new Error("Could not read mnemonic or private key")

    if (process.env.MNEMONIC != "") {
        wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "")
    } else {
        wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    }
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    console.log(`Connected to the account of address ${signer.address}`);
    console.log(`The balance of this account is ${balanceBN.toString()} Wei`);

    const args = process.argv;
    const params = args.slice(2);
    const contractAddress = params[0];
    const targetAccount = params[1];
    
    let ballotContract: Ballot;
    const ballotFactory = new Ballot__factory(signer);
    ballotContract = ballotFactory.attach(contractAddress);
    const tx = await ballotContract.giveRightToVote(targetAccount);
    const receipt = await tx.wait();
    console.log({receipt});
}

giveRightToVote().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
