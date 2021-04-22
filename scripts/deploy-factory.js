const hre = require('hardhat');
const config = require('../config');
const network = hre.network.name;

async function main() {
  if (!process.env.PK) {
    throw new Error('Missing private key')
  }

  console.log('Deploying to network:', network)
  
  const feeToSetter = config.FeeToSetter
  
  const [ deployer ] = await hre.ethers.getSigners()
  
  console.log('Deploying Factory')

  const FactoryContract = await hre.ethers.getContractFactory('PancakeFactory')
  const factory = await FactoryContract.deploy(feeToSetter)
  const codeHash = await factory.INIT_CODE_PAIR_HASH()

  console.log("feeToSetter:", feeToSetter);
  console.log("Factory deployed to:", factory.address);
  console.log("codeHash:", codeHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
