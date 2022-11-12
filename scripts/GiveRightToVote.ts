import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function giveRightToVote() {
    const provider = ethers.getDefaultProvider("goerli");
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
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

/*
Output:

(base) karenjyang@Karens-MBP Project2-Group2-EncodeSolidityBootcamp % yarn run ts-node --files ./scripts/GiveRightToVote.ts 0x7b7bc54ff75c74520f441263a6efcef036f4fa72 0x57BA79c4F28BB904DdA649E322e50028a8e85E21
Connected to the account of address 0x97c81E99e9890641058C67DE94d6ED5544432F10
The balance of this account is 92996574327614053 Wei
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
{
  receipt: {
    to: '0x7B7Bc54FF75C74520f441263a6efceF036f4FA72',
    from: '0x97c81E99e9890641058C67DE94d6ED5544432F10',
    contractAddress: null,
    transactionIndex: 21,
    gasUsed: BigNumber { _hex: '0xbe05', _isBigNumber: true },
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    blockHash: '0x72f5f92f733496bca513871ca9cb59ba88609e53fabf463943b25039de007ad1',
    transactionHash: '0x30f7b423c356013b08b15b14ce7c57affaab0a3962bbc6fb245dbf99ac2fc74d',
    logs: [],
    blockNumber: 7941915,
    confirmations: 7,
    cumulativeGasUsed: BigNumber { _hex: '0x8d77dd', _isBigNumber: true },
    effectiveGasPrice: BigNumber { _hex: '0x59682f0e', _isBigNumber: true },
    status: 1,
    type: 2,
    byzantium: true,
    events: []
  }
}

*/