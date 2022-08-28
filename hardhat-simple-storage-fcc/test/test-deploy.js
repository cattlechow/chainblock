const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", () => {
    let simpleStorage, simpleStorageFactory
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
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
