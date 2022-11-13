import { ethers, Wallet } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";

async function vote() {
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

    const args = process.argv.slice(2);

    if (args.length <= 0) throw new Error("Not enough parameters");

    const vote = args[0];
    console.log(`Voting for ${vote}`);

    let ballotContract: Ballot;
    const ballotFactory = new Ballot__factory(signer);
    const ballotContract = await ballotFactory.attach(
        "" // The deployed contract address
    );

    const tx = await ballotContract.vote(vote);

    console.log(`deployed at ${ballotContract.address}`);
}

vote().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});