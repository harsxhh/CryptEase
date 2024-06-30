const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const NFTRewards = await ethers.getContractFactory("NFTRewards");
    const nftRewards = await NFTRewards.deploy(deployer.address);
    await nftRewards.deployed();
    console.log("NFTRewards deployed to:", nftRewards.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
