import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-dependency-compiler';
import 'hardhat-abi-exporter';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-deploy';
import 'solidity-coverage';
import 'hardhat-tracer';

import '@typechain/hardhat';
import '@nomicfoundation/hardhat-chai-matchers';

import dotenv from 'dotenv';
import { keccak256 } from 'ethers';
dotenv.config();

const defaultAccount = [
  process.env.DEPLOYER_KEY || keccak256('0x1212'),
  process.env.ZAI_DEPLOYER_KEY || keccak256('0x1234'),
  process.env.SZAI_DEPLOYER_KEY || keccak256('0x1233'),
];

import './tasks/audit-timelock';

const _network = (url: string, gasPrice: number | 'auto' = 'auto') => ({
  url,
  // accounts: [process.env.PRIVATE_KEY || ""],
  accounts: defaultAccount,
  saveDeployments: true,
  gasPrice,
});

const config: HardhatUserConfig = {
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    spacing: 2,
    format: 'minimal',
  },
  gasReporter: {
    // @ts-ignore
    reportFormat: 'terminal',
    outputFile: 'coverage/gasReport.txt',
    noColors: true,
    forceTerminalOutput: true,
    forceTerminalOutputFormat: 'terminal',
  },
  dependencyCompiler: {
    paths: [
      '@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol',
      '@mahaxyz/contracts/contracts/core/psm/PegStabilityModuleYield.sol',
      '@openzeppelin/contracts/interfaces/IERC20.sol',
    ],
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v6',
  },
  solidity: {
    version: '0.8.21',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://rpc.ankr.com/eth`,
      },
      accounts: defaultAccount.map((pk) => ({
        balance: '1000000000000000000000000',
        privateKey: pk,
      })),
    },
    arbitrum: _network('https://arb1.arbitrum.io/rpc'),
    base: _network('https://mainnet.base.org'),
    sonic: _network('https://rpc.soniclabs.com'),
    unichain: _network('https://mainnet.unichain.org'),
    bsc: _network('https://bsc-dataseed1.bnbchain.org'),
    blast: _network('https://rpc.blast.io'),
    linea: _network('https://rpc.linea.build'),
    mainnet: _network('https://rpc.ankr.com/eth'),
    zircuit: _network('https://zircuit-mainnet.drpc.org'),
    optimism: _network('https://mainnet.optimism.io'),
    scroll: _network('https://rpc.ankr.com/scroll', 1100000000),
    sepolia: _network('https://rpc2.sepolia.org'),
    xlayer: _network('https://xlayerrpc.okx.com'),
  },
  namedAccounts: {
    deployer: 0,
    zaiDeployer: 1,
    szaiDeployer: 2,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_KEY || '',
      sepolia: process.env.ETHERSCAN_KEY || '',
      base: process.env.BASESCAN_KEY || '',
      blast: process.env.BLASTSCAN_KEY || '',
      bsc: process.env.BSCSCAN_KEY || '',
      linea: process.env.LINEASCAN_KEY || '',
      optimisticEthereum: process.env.OP_ETHERSCAN_KEY || '',
      scroll: process.env.SCROLLSCAN_KEY || '',
      arbitrumOne: process.env.ARBISCAN_KEY || '',
      xlayer: 'test',
    },
    customChains: [
      {
        network: 'xlayer',
        chainId: 196,
        urls: {
          apiURL:
            'https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER',
          browserURL: 'https://www.oklink.com/xlayer',
        },
      },
      {
        network: 'linea',
        chainId: 59144,
        urls: {
          apiURL: 'https://api.lineascan.build/api',
          browserURL: 'https://lineascan.build',
        },
      },
      {
        network: 'blast',
        chainId: 81457,
        urls: {
          apiURL: 'https://api.blastscan.io/api',
          browserURL: 'https://blastscan.io',
        },
      },
      {
        network: 'scroll',
        chainId: 534352,
        urls: {
          apiURL: 'https://api.scrollscan.com/api',
          browserURL: 'https://scrollscan.com',
        },
      },
    ],
  },
};

export default config;
