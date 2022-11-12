import { ethers, Wallet } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config()

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let i = 0; i < array.length; i++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[i]));
    }
    return bytes32Array;
}

async function main() {
    const network = "goerli";
    const provider = ethers.getDefaultProvider(network)
    let wallet: Wallet;

    if(process.env.MNEMONIC != "") {
        wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "")
    }else if(process.env.PRIVATE_KEY != "") {
        wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    }else{
        throw new Error("No mnemonic seed or private key found in env");
    }

    const signer = wallet.connect(provider)
    const balanceBN = await signer.getBalance();

    console.log(`Connected to ${signer.address}`);
    console.log(`Balance: ${balanceBN.toString()} Wei`);

    if(!balanceBN) throw new Error("Not enough wei");

    const args = process.argv;
    const proposals = args.slice(2);

    if(proposals.length <= 0) throw new Error("Not enough proposal values");

    console.log("Deploying...");
    console.log("Proposals: ");
    proposals.forEach((el, i) => {
        console.log(`proposal ${i + 1}: ${el}`)
    })

    let ballotContract: Ballot;
    const ballotFactory = new Ballot__factory(signer);

    ballotContract = await ballotFactory.deploy(
        convertStringArrayToBytes32(proposals)
    ) as Ballot;

    await ballotContract.deployed();
    console.log(`New contract ${ballotContract.address} deployed. Etherscan: https://${network}.etherscan.io/address/${ballotContract.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});