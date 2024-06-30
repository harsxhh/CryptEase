async function main() {
    const NFTRewards = await ethers.getContractFactory("NFTRewards");
    const nftRewards = await NFTRewards.deploy();
    await nftRewards.deployed();
    console.log("NFTRewards deployed to:", nftRewards.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  