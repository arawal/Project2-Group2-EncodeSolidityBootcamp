import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat"
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Vanilla", "Lime", "Chocolate"]

describe("Ballot", async () => {
    let ballotContract: Ballot;
    let accounts: SignerWithAddress[];

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
            // TODO
            throw Error("Not implemented");
        });
    });

    describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
        it("gives right to vote for another address", async function () {
            // TODO
            throw Error("Not implemented");
        });
        it("can not give right to vote for someone that has voted", async function () {
            // TODO
            throw Error("Not implemented");
        });
        it("can not give right to vote for someone that has already voting rights", async function () {
            // TODO
            throw Error("Not implemented");
        });
    });

    describe("when the voter interact with the vote function in the contract", function () {
        // TODO
        it("should register the vote", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when the voter interact with the delegate function in the contract", function () {
        // TODO
        it("should transfer voting power", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
        // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when the an attacker interact with the vote function in the contract", function () {
        // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when the an attacker interact with the delegate function in the contract", function () {
        // TODO
        it("should revert", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winningProposal function before any votes are cast", function () {
        // TODO
        it("should return 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
        // TODO
        it("should return 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winnerName function before any votes are cast", function () {
        // TODO
        it("should return name of proposal 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
        // TODO
        it("should return name of proposal 0", async () => {
            throw Error("Not implemented");
        });
    });

    describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
        // TODO
        it("should return the name of the winner proposal", async () => {
            throw Error("Not implemented");
        });
    });
});