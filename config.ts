export const timelockConfig = {
  coldWallet: '0x84E0E243bF4D297C63740E284e2977836AC011CD', // cold wallet (custodian) which has the ability to propose transactions as well as cancel them in case safe gets compromised
  hotWallet: '0x77cd66d59ac48a0E7CE54fF16D9235a5fffF335E', // hot wallet (deployer) which has the ability to execute transactions

  // TODO once the governance is live, we will restrict the cold wallet to only cancel transactions

  governorContracts: {
    // todo we need to deploy the various governor contracts
  },

  // The following addresses are the various gnosis safes. they have the ability to execute transactions
  gnosisSafes: '0x7202136d70026DA33628dD3f3eFccb43F62a2469',
};
