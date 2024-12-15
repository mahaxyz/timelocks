import hre from 'hardhat';
import assert from 'assert';
import { getTimelock, prepareTimelockData } from '../prepare-timelock';
import { mockExecuteTimelock } from '../mock-exec-timelock';
import { ContractTransaction } from 'ethers';

const job = async () => {
  assert(hre.network.name === 'mainnet' || hre.network.name === 'hardhat', 'not mainnet');
  console.log('using network', hre.network.name);
  const timelock = await getTimelock(hre, '0x43c958affe41d44f0a02ae177b591e93c86adbea');
  const maha = await hre.ethers.getContractAt(
    'IERC20',
    '0x745407c86df8db893011912d3ab28e68b62e49b0'
  );

  const safe = '0x6357EDbfE5aDA570005ceB8FAd3139eF5A8863CC';
  const dest = '0x7202136d70026DA33628dD3f3eFccb43F62a2469';

  const txs: ContractTransaction[] = [];
  txs.push(await maha.transfer.populateTransaction(dest, await maha.balanceOf(timelock.target)));

  const tx = await prepareTimelockData(hre, safe, txs, timelock.target);

  await mockExecuteTimelock(tx.schedule, tx.execute, 86400 * 15, 'mainnet', async () => {
    console.log('balance of timelock', await maha.balanceOf(timelock.target));
    console.log('balance of dest', await maha.balanceOf(dest));
  });
};

job();
