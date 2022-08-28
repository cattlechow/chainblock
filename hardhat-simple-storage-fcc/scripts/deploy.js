// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")

async function main() {
    const simpleStorageFactory = await hre.ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploy start...")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deploy contract to:  ${simpleStorage.address}`)
    // 部署到自己的hardhat network时验证
    if (hre.network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmations... ")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }
    // 与合约交互
    const currentValue = await simpleStorage.retrieve()
    console.log(`current value: ${currentValue}`)
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updateValue = await simpleStorage.retrieve()
    console.log(`update value is ${updateValue}`)
}

// 合约部署后自动验证
const verify = async (contractsAddress, args) => {
    console.log("Verifying contract..")
    try {
        await hre.run("verify:verify", {
            address: contractsAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
