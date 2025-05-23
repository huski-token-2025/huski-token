import { apiTestnet } from '@/api/api';
import { formatTimestamp, getOwnedSSHARE, getOwnedSui, queryEventsAll } from '@/api/utils';
import { ADDRESS_BLUB, ADDRESS_HUSKI, ADDRESS_SUI, common, contract } from '@/contact/contact';
import { TransactionBlock } from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';
import axios from 'axios';

export async function ChangeToSui() {
  contract.ADDRESS = ADDRESS_SUI;
  common.DECIMALS = 10 ** 9;
  // console.log(contract.ADDRESS.coinType1, contract.ADDRESS.coinType2);
}

export async function ChangeToHuski() {
  contract.ADDRESS = ADDRESS_HUSKI;
  common.DECIMALS = 10 ** 0;
  // console.log(contract.ADDRESS.coinType1, contract.ADDRESS.coinType2);
}

export async function ChangeToBlub() {
  contract.ADDRESS = ADDRESS_BLUB
  common.DECIMALS = 10 ** 2
  // console.log(contract.ADDRESS.coinType1, contract.ADDRESS.coinType2)
}

export async function handleGetTotalStake() {
  let data = await queryEventsAll(contract.ADDRESS.eventTypeTotalStake, common.LIMIT_NETVALUE);
  data.reverse();

  return data.map((element: { timestampMs: any; parsedJson: { total_stake: number } }) => {
    return {
      timestamp: formatTimestamp(parseInt(element.timestampMs)),
      totalStake: element.parsedJson.total_stake / common.DECIMALS,
    };
  });
}

export async function handleGetEventNetValue() {
  let data = await queryEventsAll(contract.ADDRESS.eventTypeNetValue, common.LIMIT_NETVALUE);
  if (data && data.length > 0) {
    data.reverse();
    return data.map((element: { timestampMs: any; parsedJson: { net_value: number } }) => {
      return {
        timestamp: formatTimestamp(parseInt(element.timestampMs)),
        netValue: element.parsedJson.net_value / 10 ** 9,
      };
    });
  } else {
    return [];
  }
}

export async function handleGetAPY() {
  let data = await queryEventsAll(contract.ADDRESS.eventTypeNetValue, common.LIMIT_NETVALUE);
  // console.log(data.length)
  if (data && data.length > 0) {
    data.reverse();
    let profit =
      (data[data.length - 1].parsedJson.net_value - data[0].parsedJson.net_value) / 10 ** 9;
    let time = parseInt(data[data.length - 1].timestampMs) - parseInt(data[0].timestampMs);
    // console.log("APY:", profit * 3153600000000 / time, "%")
    return (profit * 3153600000000) / time;
  }
}

export function getSUIAmount(wallet: WalletContextState) {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'suix_getBalance',
        params: [wallet.address, contract.ADDRESS.coinType1],
      })
      .then((response) => {
        resolve(response.data?.result?.totalBalance / common.DECIMALS);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function handleGetSUIAmount(wallet: WalletContextState) {
  try {
    return await getSUIAmount(wallet);
  } catch (error) {
    console.log(error);
  }
}

export function getSSHAREAmount(wallet: WalletContextState) {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'suix_getBalance',
        params: [wallet.address, contract.ADDRESS.coinType2],
      })
      .then((response) => {
        resolve(response.data?.result?.totalBalance / common.DECIMALS);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export async function handleGetSSHAREAmount(wallet: WalletContextState) {
  try {
    return await getSSHAREAmount(wallet);
  } catch (error) {
    console.log(error);
  }
}

const contractModule = 'mine';
export async function handleGetCurrentNetValue(): Promise<number> {
  // console.log(data.length)
  return new Promise(async (resolve) => {
    let data = await queryEventsAll(contract.ADDRESS.eventTypeNetValue, common.LIMIT_NETVALUE);
    // console.log(data[0].parsedJson.net_value / 10 ** 9)
    resolve(data[0].parsedJson.net_value / 10 ** 9);
  });
}
export async function handleSharesAmountToGet(suiAmount: any): Promise<number> {
  // console.log(data.length)
  return new Promise(async (resolve) => {
    let netValue: number = await handleGetCurrentNetValue();
    resolve(suiAmount / netValue);
  });
}
export async function handleSuiAmountToGet(sharesAmount: any): Promise<number> {
  // console.log(data.length)
  return new Promise(async (resolve) => {
    let netValue: number = await handleGetCurrentNetValue();
    // console.log(sharesAmount * netValue)
    resolve(sharesAmount * netValue);
  });
}

export async function handleStake(wallet: WalletContextState, amountAdd: any) {
  const coinData = await getOwnedSui(wallet.address);
  // console.log(coinData);

  if (coinData && coinData.length > 0) {
    const contractMethod = 'add_to_bank';
    try {
      const tx = new TransactionBlock();

      if (coinData.length > 1) {
        // console.log('>1');

        let toMerge: (
          | { kind: 'Input'; index: number; type?: 'object' | 'pure' | undefined; value?: any }
          | { kind: 'GasCoin' }
          | { kind: 'Result'; index: number }
          | { kind: 'NestedResult'; index: number; resultIndex: number }
        )[] = [];

        coinData.slice(1).forEach(
          (element: {
            data: {
              objectId:
              | string
              | {
                Object:
                | {
                  ImmOrOwned: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                  };
                }
                | {
                  Shared: {
                    objectId: string;
                    initialSharedVersion: string | number;
                    mutable: boolean;
                  };
                };
              };
            };
          }) => {
            // console.log(element.data.objectId);
            toMerge.push(tx.object(element.data.objectId));
          },
        );
        if (contract.ADDRESS.coinType1 === '0x2::sui::SUI') tx.mergeCoins(tx.gas, toMerge);
        else tx.mergeCoins(tx.object(coinData[0].data.objectId), toMerge);
      }
      // console.log(coinData[0].data.objectId);
      let [coin] =
        contract.ADDRESS.coinType1 === '0x2::sui::SUI'
          ? tx.splitCoins(tx.gas, [tx.pure(amountAdd)])
          : tx.splitCoins(tx.object(coinData[0].data.objectId), [tx.pure(amountAdd)]);

      tx.moveCall({
        target: `${common.contractAddress}::${contractModule}::${contractMethod}`,
        typeArguments: [contract.ADDRESS.coinType1, contract.ADDRESS.coinType2],
        arguments: [tx.object(contract.ADDRESS.bankId), coin],
      });

      await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      // console.log('executeMoveCall success');
      return true;
      // alert('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      // console.error('executeMoveCall failed', e);
      // alert('executeMoveCall failed (see response in the console)');
      return false;
    }
  } else {
    // console.log('error: 0 length');
    return false;
  }
}

export async function handleUnstake(wallet: WalletContextState, amountRemove: any) {
  const sshareData = await getOwnedSSHARE(wallet.address);
  // console.log(sshareData)
  let contractMethod = 'remove_from_bank';
  const tx = new TransactionBlock();

  if (sshareData.length > 1) {
    let toMerge: (
      | { kind: 'Input'; index: number; type?: 'object' | 'pure' | undefined; value?: any }
      | { kind: 'GasCoin' }
      | { kind: 'Result'; index: number }
      | { kind: 'NestedResult'; index: number; resultIndex: number }
    )[] = [];
    sshareData.slice(1).forEach(
      (element: {
        data: {
          objectId:
          | string
          | {
            Object:
            | { ImmOrOwned: { objectId: string; version: string | number; digest: string } }
            | {
              Shared: {
                objectId: string;
                initialSharedVersion: string | number;
                mutable: boolean;
              };
            };
          };
        };
      }) => {
        toMerge.push(tx.object(element.data.objectId));
      },
    );
    tx.mergeCoins(tx.object(sshareData[0].data.objectId), toMerge);
  }

  try {
    let [coin] = tx.splitCoins(tx.object(sshareData[0].data.objectId), [tx.pure(amountRemove)]);

    tx.moveCall({
      target: `${common.contractAddress}::${contractModule}::${contractMethod}`,
      typeArguments: [contract.ADDRESS.coinType1, contract.ADDRESS.coinType2],
      arguments: [tx.object(contract.ADDRESS.bankId), coin],
    });

    await wallet.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });

    // console.log('executeMoveCall success', resData);
    // alert('executeMoveCall succeeded (see response in the console)');
    return true;
  } catch (e) {
    // console.error('executeMoveCall failed', e);
    // alert('executeMoveCall failed (see response in the console)');
    return false;
  }
}
