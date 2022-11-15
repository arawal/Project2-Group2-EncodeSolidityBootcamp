import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat"
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Vanilla", "Lime", "Chocolate"]

// this describe block deploys the contract to be interacted with in each nested describe block
describe("Ballot", async () => {
    // contract and accounts declared in higher scope so they can be used in nested describe blocks
    let ballotContract: Ballot;
    let accounts: SignerWithAddress[];

    // before each nested describe block, deploy the contract (this is a hook)
    beforeEach(async () => {
        accounts = await ethers.getSigners();
        const ballotFactory = await ethers.getContractFactory("Ballot");
        ballotContract = await ballotFactory.deploy(
            PROPOSALS.map(p => ethers.utils.formatBytes32String(p))
        );
        await ballotContract.deployed();
    })

    describe("when the contract is deployed", async () => {
        it("has provided proposals", async () => {
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.proposals(index);
                expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
                    PROPOSALS[index]
                );
            }
        })

        it("should set the deployer address as the chairperson", async () => {
            const chairperson = await ballotContract.chairperson();
            expect(chairperson).to.eq(accounts[0].address);
        })

        it("sets the voting weight for the chairperson as 1", async () => {
            const chairperson = await ballotContract.chairperson();
            // const chairperson = accounts[0].address
            // better to use the commented out method so as not to let other tests interfere with this particular test
            const chairpersonWeight = await ballotContract.voters(chairperson);
            expect(chairpersonWeight.weight).to.eq(1);
        })

        it("has zero votes for all proposals", async function () {
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.proposals(index);
                expect(proposal.voteCount).to.eq(0);
            }

        });
    });

    describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
        it("gives right to vote for another address", async function () {
            const voter = accounts[1].address;
            await ballotContract.giveRightToVote(voter);
            const voterWeight = await ballotContract.voters(voter);
            expect(voterWeight.weight).to.eq(1);
        });
        it("can not give right to vote for someone that has voted", async function () {
            const voter = accounts[1].address;
            await ballotContract.giveRightToVote(voter);
            // the voter casts their vote
            await ballotContract.connect(accounts[1]).vote(0);
            await expect(ballotContract.giveRightToVote(voter)).to.be.revertedWith("The voter already voted.");
        });
        it("can not give right to vote for someone that has already voting rights", async function () {
            const voter = accounts[1].address;
            await ballotContract.giveRightToVote(voter);
            await expect(ballotContract.giveRightToVote(voter)).to.be.revertedWithoutReason();
        });
    });

    describe("when the voter interact with the vote function in the contract", function () {
        it("should register the vote", async () => {
            let voter = accounts[1].address;
            let voterContractInstnce = ballotContract.connect(accounts[1]);
        
            await ballotContract.giveRightToVote(voter); // chairman gives voter the right to vote
            await voterContractInstnce.vote(0); // voter votes for proposal 0
            const proposal = await ballotContract.proposals(0); // get the proposal at the 0 index
            expect(proposal.voteCount).to.eq(1);
        });
    });

    describe("when the voter interact with the delegate function in the contract", function () {
        it("should transfer voting power", async () => {
            let voter = accounts[1].address;
            let voterReceivingDelegatedVote = accounts[2].address;

            await ballotContract.giveRightToVote(voter); // chairman gives voter the right to vote
            await ballotContract.giveRightToVote(voterReceivingDelegatedVote); // chairman gives voterReceivingDelegatedVote the right to vote
            await ballotContract.connect(accounts[1]).delegate(voterReceivingDelegatedVote); // voter delegates their vote to account 2
            const voterWeight = await ballotContract.voters(voterReceivingDelegatedVote); // get the voter's weight
            expect(voterWeight.weight).to.eq(2);
        });
    });

    describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
        it("should revert", async () => {
            let voter = accounts[1].address;
            let attackerContractInstance = ballotContract.connect(accounts[2]);

            await expect(attackerContractInstance.giveRightToVote(voter)).to.be.revertedWith("Only chairperson can give right to vote.");
        });
    });

    describe("when the an attacker interact with the vote function in the contract", function () {
        it("should revert", async () => {
            let attackerContractInstance = ballotContract.connect(accounts[2]);

            await expect(attackerContractInstance.vote(0)).to.be.revertedWith("Has no right to vote");
        });
    });

    describe("when the an attacker interact with the delegate function in the contract", function () {
        it("should revert", async () => {
            let attackerContractInstance = ballotContract.connect(accounts[2]);

            await expect(attackerContractInstance.delegate(accounts[1].address)).to.be.revertedWith("You have no right to vote");
        });
    });

    describe("when someone interact with the winningProposal function before any votes are cast", function () {
        it("should return 0", async () => {
            let winningProposal = await ballotContract.winningProposal();

            expect(winningProposal).to.eq(0);
        });
    });

    describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
        it("should return 0", async () => {
            let voter = accounts[1].address;
            let voterContractInstnce = ballotContract.connect(accounts[1]);

            await ballotContract.giveRightToVote(voter); // chairman gives voter the right to vote
            await voterContractInstnce.vote(0); // voter votes for proposal 0
            let winningProposal = await ballotContract.winningProposal();

            expect(winningProposal).to.eq(0);
        });
    });

    describe("when someone interact with the winnerName function before any votes are cast", function () {
        it("should return name of proposal 0", async () => {
            let winnerName = await ballotContract.winnerName();

            // winnerName is a bytes32 so we need to parse it to a string using the ethers utils library
            let formattedName = ethers.utils.parseBytes32String(winnerName);
            expect(formattedName).to.eq(PROPOSALS[0]);
        });
    });

    describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
        it("should return name of proposal 0", async () => {
            let voter = accounts[1].address;
            let voterContractInstnce = ballotContract.connect(accounts[1]);

            await ballotContract.giveRightToVote(voter); // chairman gives voter the right to vote
            await voterContractInstnce.vote(0); // voter votes for proposal 0
            let winnerName = await ballotContract.winnerName();

            // winnerName is a bytes32 so we need to parse it to a string using the ethers utils library
            let formattedName = ethers.utils.parseBytes32String(winnerName);
            expect(formattedName).to.eq(PROPOSALS[0]);
        });
    });

    describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
        it("should return the name of the winner proposal", async () => {

            // iterate through 5 different voters to vote for a random proposal between 0 and 2
            for (let i = 1; i < 6; i++) {
                const rndInt = Math.floor(Math.random() * 3); // generate a random proposal number between 0 and 2

                await ballotContract.giveRightToVote(accounts[i].address); // chairman gives voter the right to vote
                await ballotContract.connect(accounts[i]).vote(rndInt); // voter votes for proposal 0
            }

            let winningProposal = await ballotContract.winningProposal();
            let winnerName = await ballotContract.winnerName();

            
            // winnerName is a bytes32 so we need to parse it to a string using the ethers utils library
            let formattedName = ethers.utils.parseBytes32String(winnerName);
            // if the winning proposal is the respective index of the winnerName, then the test passes
            expect(winningProposal).to.eq(PROPOSALS.indexOf(formattedName));
        });
    });
});