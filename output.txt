1. 
Brent deployed:
yarn run ts-node --files ./scripts/Deployment.ts "Poodle" "Borzoi" "Chihuahua"
Connected to 0x57BA79c4F28BB904DdA649E322e50028a8e85E21
Balance: 198307585981947584 Wei
Deploying...
Proposals: 
proposal 1: Poodle
proposal 2: Borzoi
proposal 3: Chihuahua
New contract 0x2B671F8EEc0e3416781b306271A84E3232Ec5ac1 deployed. Etherscan: https://goerli.etherscan.io/address/0x2B671F8EEc0e3416781b306271A84E3232Ec5ac1

2.
Karen pushed GiveRightToVote.ts to git
Brent pulled GiveRightToVote.ts and executed it for each of the follwing eth addresses
(brent: 0x57BA79c4F28BB904DdA649E322e50028a8e85E21, karen: 0x1145BC8530b27E63bFBaCDe7971ce2F922c79764, lee: 0xEF3B0FA26d8dc6Eb00cC15fD1C26c8983D5a2844, ryan: 0xcFb45E1E909582C568B05c3973c3F50fF34E6ec8, akshar: 0x4e3FCc293E58D57219b85393A9aB03575F7A4955)
resulting in the following putput:
yarn run ts-node --files ./scripts/GiveRightToVote.ts "0x2B671F8EEc0e3416781b306271A84E3232Ec5ac1" "0x4e3FCc293E58D57219b85393A9aB03575F7A4955"
Connected to the account of address 0x57BA79c4F28BB904DdA649E322e50028a8e85E21
The balance of this account is 196615171967279996 Wei
{
  receipt: {
    to: '0x2B671F8EEc0e3416781b306271A84E3232Ec5ac1',
    from: '0x57BA79c4F28BB904DdA649E322e50028a8e85E21',
    contractAddress: null,
    transactionIndex: 27,
    gasUsed: BigNumber { _hex: '0xbe11', _isBigNumber: true },
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    blockHash: '0x83c6deacb974643b5a25cfe37bf1cc3984588b5fa15bf73fb5cc019ea437c5a2',
    transactionHash: '0xd1c679d6d1256aec911133d0c6d15e34b3f6b903d817380ed6156c3043c22e5f',
    logs: [],
    blockNumber: 7942651,
    confirmations: 8,
    cumulativeGasUsed: BigNumber { _hex: '0x198700', _isBigNumber: true },
    effectiveGasPrice: BigNumber { _hex: '0x59682f0d', _isBigNumber: true },
    status: 1,
    type: 2,
    byzantium: true,
    events: []
  }
}

3.

