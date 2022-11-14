import { ethers, Wallet } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config()

async function vote() {
    const provider = ethers.getDefaultProvider("goerli")
    let wallet: Wallet;
    if (process.env.MNEMONIC == undefined && process.env.PRIVATE_KEY == undefined) throw new Error("Could not read mnemonic or private key")

    if (process.env.MNEMONIC != "") {
        wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "")
    } else {
        wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    }
    const signer = wallet.connect(provider)
    const balanceBN = await signer.getBalance();

    console.log(`Connected to ${signer.address}`);
    console.log(`Balance: ${balanceBN.toString()} Wei`);

    const args = process.argv.slice(2);

    if (args.length <= 0) throw new Error("Not enough parameters");

    const contract = args[0];
    const vote = args[1];
    console.log(`Voting for ${vote}`);

    const ballotFactory = new Ballot__factory(signer);
    const ballotContract = await ballotFactory.attach(
        contract
    );

    const tx = await ballotContract.vote(vote);

    console.log(`deployed at ${ballotContract.address}`);
}

vote().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});