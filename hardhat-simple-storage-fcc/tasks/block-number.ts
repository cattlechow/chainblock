import { task } from "hardhat/config"

export default task("block-number", "Print the current block number").setAction(
    async (taskArg, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)
