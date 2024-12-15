// update the PSM module to have lower fees and point to the new cron collector contract
import hre from 'hardhat';
import assert from 'assert';
import { getTimelock, prepareTimelockData } from '../prepare-timelock';
import { mockExecuteTimelock } from '../mock-exec-timelock';
import { ContractTransaction } from 'ethers';

const job = async () => {
  assert(hre.network.name === 'mainnet' || hre.network.name === 'hardhat', 'not mainnet');
  console.log('using network', hre.network.name);
  const timelock = await getTimelock(hre);

  const psm = await hre.ethers.getContractAt(
    'PegStabilityModuleYield',
    '0x7DCdE153e4cACe9Ca852590d9654c7694388Db54'
  );

  const safe = '0x6357EDbfE5aDA570005ceB8FAd3139eF5A8863CC';
  const cron = '0xC2dDFfC5A03d14CFBE35b57dDE3D6Bb6011Af43E';
  const feeCollectorRole = await psm.FEE_COLLECTOR_ROLE();

  const txs: ContractTransaction[] = [];

  txs.push(await psm.grantRole.populateTransaction(feeCollectorRole, cron));
  txs.push(await psm.updateFees.populateTransaction(0, 300));
  txs.push(await psm.updateFeeDestination.populateTransaction(cron));

  const tx = await prepareTimelockData(hre, safe, txs, timelock.target);

  console.log('psm mintFeeBps', await psm.mintFeeBps());
  console.log('psm redeemFeeBps', await psm.redeemFeeBps());

  await mockExecuteTimelock(tx.schedule, tx.execute, 86400 * 3, 'mainnet', async () => {
    console.log('psm mintFeeBps', await psm.mintFeeBps());
    console.log('psm redeemFeeBps', await psm.redeemFeeBps());
  });
};

job();
