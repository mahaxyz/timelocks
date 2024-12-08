# MAHA Timelock

This repo keeps track of all the various timelock contracts deployed across various chains. This repo is also used to prepare the transaction data for the various timelocks.

Each timelock is set for 3 days and has the following permissions enabled.

| Role      | Address                                                                                     | Description                 |
| --------- | ------------------------------------------------------------------------------------------- | --------------------------- |
| Proposer  | Gnosis Multisig                                                                             | The 3/5 team multisig       |
| Proposer  | Governor Contract (TBD)                                                                     | The DAO Governance contract |
| Proposer  | [0x84E0.....011CD](https://etherscan.io/address/0x84E0E243bF4D297C63740E284e2977836AC011CD) | Cold wallet                 |
| Executor  | Gnosis Multisig                                                                             | The 3/5 team multisig       |
| Executor  | [0x84E0.....011CD](https://etherscan.io/address/0x84E0E243bF4D297C63740E284e2977836AC011CD) | Cold wallet                 |
| Canceller | Gnosis Multisig                                                                             | The 3/5 team multisig       |
| Canceller | [0x84E0.....011CD](https://etherscan.io/address/0x84E0E243bF4D297C63740E284e2977836AC011CD) | Cold wallet                 |

The deployed addresses for the various timelocks can be found here.

| Ethereum Network | Timelock Address                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet          | [0x690002da1f2d828d72aa89367623df7a432e85a9](https://etherscan.io/address/0x690002da1f2d828d72aa89367623df7a432e85a9)                     |
| Linea            | [0x690005544ba364a53dcc9e8d81c9ce1e90018ab7](https://lineascan.build/address/0x690005544ba364a53dcc9e8d81c9ce1e90018ab7)                  |
| Base             | [0x690005544ba364a53dcc9e8d81c9ce1e90018ab7](https://basescan.org/address/0x690005544ba364a53dcc9e8d81c9ce1e90018ab7)                     |
| Arbitrum         | [0x690005544ba364a53dcc9e8d81c9ce1e90018ab7](https://arbiscan.io/address/0x690005544ba364a53dcc9e8d81c9ce1e90018ab7)                      |
| Blast            | [0x690005544ba364a53dcc9e8d81c9ce1e90018ab7](https://blastscan.io/address/0x690005544ba364a53dcc9e8d81c9ce1e90018ab7)                     |
| xLayer           | [0x3111d6b18634d5d858c22c9189cbc4c8be1773b8](https://www.okx.com/web3/explorer/xlayer/address/0x3111d6b18634d5d858c22c9189cbc4c8be1773b8) |
