import hre from 'hardhat';
import assert from 'assert';
import { getTimelock, prepareTimelockData } from '../prepare-timelock';
import { mockExecuteTimelock } from '../mock-exec-timelock';
import { ContractTransaction } from 'ethers';

const job = async () => {
  const OMNICHAIN_STAKING_TOKEN_PROXY = '0xfD487AC8de6520263D57bb41253682874Dc0276E';
  const safe = '0x7202136d70026DA33628dD3f3eFccb43F62a2469';
  const PROXY_ADMIN = '0x69000c978701fC4427D4Baf749F10a5cEC582863';
  const NEW_IMPLEMENTATION = '0xD541b08f108cFAB2fe97EA92cF9520BD064c48B3'; // New Implementation Address
  assert(hre.network.name === 'base' || hre.network.name === 'hardhat', 'not mainnet');
  console.log('using network', hre.network.name);
  const timelock = await getTimelock(hre, '0x690005544ba364a53dcc9e8d81c9ce1e90018ab7');
  const proxyAdmin = await hre.ethers.getContractAt('ProxyAdmin', PROXY_ADMIN);
  const txs: ContractTransaction[] = [];
  txs.push(
    await proxyAdmin.upgradeAndCall.populateTransaction(
      OMNICHAIN_STAKING_TOKEN_PROXY,
      NEW_IMPLEMENTATION,
      '0x'
    )
  );
  const tx = await prepareTimelockData(hre, safe, txs, timelock.target);
  await mockExecuteTimelock(tx.schedule, tx.execute, 86400 * 15, 'base', async () => {
    console.log('executed');
  });
};

job();
