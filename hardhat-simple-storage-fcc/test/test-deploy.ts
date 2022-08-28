import { ethers } from "hardhat"
import { assert, expect } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", () => {
    let simpleStorage: SimpleStorage,
        simpleStorageFactory: SimpleStorage__factory
    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number is 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedNumber = "0"
        assert.equal(currentValue.toString(), expectedNumber)
    })

    it("Should update when we call store", async function () {
        const expectedNumber = "7"
        const transactionResponse = await simpleStorage.store(expectedNumber)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedNumber)
    })
})
