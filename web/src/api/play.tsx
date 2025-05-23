import { TransactionBlock } from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';
import axios from 'axios';
import { apiTestnet } from './api';

import { getOwnedSui, getOwnedTickets } from '@/api/utils';
import { common, contract } from '@/contact/contact';
import { GLOBALS } from '@/global';

// get odds
export async function handleGetOdds(game: any): Promise<string[]> {
  try {
    let oddsId = common.oddsId16;
    if (game === 16) oddsId = common.oddsId16;
    if (game === 25) oddsId = common.oddsId25;
    if (game === 36) oddsId = common.oddsId36;
    const response = await axios.post(apiTestnet, {
      jsonrpc: '2.0',
      id: 1,
      method: 'sui_getObject',
      params: [
        oddsId,
        {
          showType: false,
          showOwner: false,
          showPreviousTransaction: false,
          showDisplay: false,
          showContent: true,
          showBcs: false,
          showStorageRebate: false,
        },
      ],
    });
    let data = response.data.result.data.content.fields.values;
    let odds: string[] = [];
    data.forEach((element: string) => {
      odds.push(
        parseFloat((parseInt(element) / common.DECIMALS_ODDS).toFixed(3))
          .toFixed(3)
          .padEnd(5, '0') + 'x',
      );
    });
    return odds;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const contractModule = 'mine';
export async function handlePlay(
  wallet: WalletContextState,
  game: string,
  amountBet: number,
  gem_number: number,
  vip: any,
) {
  GLOBALS.count = 0;
  GLOBALS.open = true;

  let promoCode = contract.ADDRESS.defaultVipId;
  if (vip) promoCode = vip;
  try {
    const ticketData = await getOwnedTickets(wallet.address);

    const tx = new TransactionBlock();

    if (ticketData && ticketData.length > 0) {
      const contractMethod = 'redeem';

      ticketData.forEach(
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
          // console.log(element.data.objectId);
          tx.moveCall({
            target: `${common.contractAddress}::${contractModule}::${contractMethod}`,
            typeArguments: [contract.ADDRESS.coinType1, contract.ADDRESS.coinType2],
            arguments: [
              tx.object(element.data.objectId),
              tx.object(contract.ADDRESS.bankId),
              tx.pure(contract.ADDRESS.coinType1),
            ],
          });
        },
      );
    }

    const coinData = await getOwnedSui(wallet.address);
    // console.log(coinData)
    const contractMethod = 'mine_' + game;

    if (coinData && coinData.length > 0) {
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

      let [coin] =
        contract.ADDRESS.coinType1 === '0x2::sui::SUI'
          ? tx.splitCoins(tx.gas, [tx.pure(amountBet)])
          : tx.splitCoins(tx.object(coinData[0].data.objectId), [tx.pure(amountBet)]);

      try {
        tx.moveCall({
          target: `${common.contractAddress}::${contractModule}::${contractMethod}`,
          typeArguments: [contract.ADDRESS.coinType1, contract.ADDRESS.coinType2],
          arguments: [
            tx.pure('0x8'),
            tx.object(contract.ADDRESS.bankId),
            coin,
            tx.pure(gem_number),
            tx.pure(promoCode),
          ],
        });

        // const resData = await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });s
        // console.log('executeMoveCall success', resData);
        // alert('executeMoveCall succeeded (see response in the console)');
        await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
        return true;
      } catch (e) {
        console.error('executeMoveCall failed', e);
        // alert('executeMoveCall failed (see response in the console) ' + e);
        return false;
      }
    } else {
      console.log('error: 0 length');
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // alert('An error occurred: ' + error);
    return false;
  }
}
export async function handleGetRandomNumbers(wallet: WalletContextState) {
  GLOBALS.count = 0;
  GLOBALS.open = true;
  try {
    const ticketData = await getOwnedTickets(wallet.address);
    if (ticketData && ticketData.length > 0) {
      const last_ticket = ticketData[ticketData.length - 1].data.objectId;

      const response = await axios.post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'sui_getObject',
        params: [
          last_ticket,
          {
            showType: false,
            showOwner: false,
            showPreviousTransaction: false,
            showDisplay: false,
            showContent: true,
            showBcs: false,
            showStorageRebate: false,
          },
        ],
      });

      if (response.data && response.data.result && response.data.result.data) {
        const data = response.data.result.data;
        GLOBALS.gem_number = data.content.fields.gem_number;
        GLOBALS.bomb_number = data.content.fields.bomb_number;
        GLOBALS.gem_amount = data.content.fields.gem_amount;

        // console.log(GLOBALS.gem_number, GLOBALS.bomb_number);

        return [GLOBALS.gem_number, GLOBALS.bomb_number];
      } else {
        console.log('Error: Invalid data structure in API response.');
        return [];
      }
    } else {
      console.log('Error: No ticket data found.');
      return [];
    }
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    return [];
  }
}

export async function handleGetUnredeemedList(wallet: WalletContextState) {
  try {
    const ticketData = await getOwnedTickets(wallet.address);
    let list: any[] = [];
    // console.log(ticketData)
    if (ticketData && ticketData.length > 0) {
      ticketData.forEach((element: { data: { content: { fields: any } } }) => {
        list.push(element.data.content.fields);
      });
      return list;
    } else {
      console.log('Error: No data found.');
      return null;
    }
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    return null;
  }
}
export async function handleGetUnredeemed(wallet: WalletContextState) {
  try {
    const ticketData = await getOwnedTickets(wallet.address);
    if (ticketData && ticketData.length > 0) {
      let unredeemed = 0;
      ticketData.forEach((element: { data: { content: { fields: { win: number } } } }) => {
        unredeemed += element.data.content.fields.win / common.DECIMALS;
      });
      // console.log(unredeemed);
      return unredeemed;
    } else {
      // console.log('Error: No data found.');
      return null;
    }
  } catch (error) {
    // console.error('Error occurred while fetching data:', error);
    return null;
  }
}
export async function handleRedeemAllRewards(wallet: WalletContextState) {
  try {
    const ticketData = await getOwnedTickets(wallet.address);

    const tx = new TransactionBlock();

    if (ticketData && ticketData.length > 0) {
      const contractMethod = 'redeem';

      ticketData.forEach(
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
          // console.log(element.data.objectId);
          tx.moveCall({
            target: `${common.contractAddress}::${contractModule}::${contractMethod}`,
            typeArguments: [contract.ADDRESS.coinType1, contract.ADDRESS.coinType2],
            arguments: [
              tx.object(element.data.objectId),
              tx.object(contract.ADDRESS.bankId),
              tx.pure(contract.ADDRESS.coinType1),
            ],
          });
        },
      );
      try {
        await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
        // console.log('executeMoveCall success', resData);
        return true;
      } catch (e) {
        console.error('executeMoveCall failed', e);
        // alert('executeMoveCall failed (see response in the console) ' + e);
      }
    } else {
      console.log('Error: No data found.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // alert('An error occurred: ' + error);
  }
}
