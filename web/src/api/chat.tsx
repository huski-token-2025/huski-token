import {
  formatPlayerName,
  formatTimestamp,
  // getObject,
  getOwnedSuiLottery,
  queryEventsAll,
} from '@/api/utils';
import {
  ADDRESS_BLUB,
  ADDRESS_HUSKI,
  ADDRESS_SUI,
  ADDRESS_USDC,
  ADDRESS_USDT,
  common,
  contract,
} from '@/contact/contact';
import { TransactionBlock } from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';

const suichatContractModule = 'suichat';
export async function handleSendMsg(wallet: WalletContextState, info: string) {
  const coinData = await getOwnedSuiLottery(wallet.address);
  if (coinData && coinData.length > 0) {
    try {
      const tx = new TransactionBlock();
      if (coinData.length > 1) {
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
        tx.mergeCoins(tx.gas, toMerge);
      }

      // const messageInput = (document.getElementById("messageInput") as HTMLInputElement)?.value;

      // console.log(messageInput.length)

      const contractMethod = 'send_msg';

      tx.moveCall({
        target: `${common.contractAddress}::${suichatContractModule}::${contractMethod}`,
        // typeArguments: [contract.ADDRESS.coinType1],
        arguments: [tx.pure(info), tx.pure(contract.ADDRESS.coinType1)],
      });

      await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      // console.log('executeMoveCall success', resData);
      return true;
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

export async function handleGetChatMsg() {
  let data = await queryEventsAll(contract.ADDRESS.eventTypeMsg, common.LIMIT_CHATROOM);
  // console.log(data)
  // let dataLottery = await queryEventsAll(contract.ADDRESS.eventTypeNewGame, 1);
  // const game = await getObject(dataLottery[0].parsedJson.game_id);
  // let lotteryMaxParticipants = game.content.fields.max_participants;
  data.reverse();
  let msgList: any[] = [];

  for (const element of data) {
    // if (element.id.eventSeq == '0')
    let coinType = '';
    let type = '';
    let decimal = 10 ** 0;
    if (element.parsedJson.msg_type === 'win') {
      type = 'win';
      if (element.parsedJson.coin_type === ADDRESS_SUI.coinType1) {
        decimal = 10 ** 9;
        coinType = element.parsedJson.value / decimal + ' SUI';
      }
      if (element.parsedJson.coin_type === ADDRESS_HUSKI.coinType1) {
        decimal = 10 ** 0;
        coinType = element.parsedJson.value / decimal + ' HUSKI';
      }
      if (element.parsedJson.coin_type === ADDRESS_USDC.coinType1) {
        decimal = 10 ** 6;
        coinType = element.parsedJson.value / decimal + ' USDC';
      }
      if (element.parsedJson.coin_type === ADDRESS_USDT.coinType1) {
        decimal = 10 ** 6;
        coinType = element.parsedJson.value / decimal + ' USDT';
      }
      if (element.parsedJson.coin_type === ADDRESS_BLUB.coinType1) {
        decimal = 10 ** 2;
        coinType = element.parsedJson.value / decimal + ' BLUB';
      }
    }
    if (element.parsedJson.msg_type === 'new_lottery_buy') {
      type = 'new_lottery_buy';
      // coinType = element.parsedJson.value / decimal + '/' + lotteryMaxParticipants;
      coinType = element.parsedJson.value / decimal + '/';
    }
    if (element.parsedJson.msg_type === 'new_lottery_created') {
      type = 'new_lottery_created';
    }
    if (element.parsedJson.msg_type === 'chat') {
      type = 'chat';
    }
    if (element.parsedJson.msg_type === 'new_lottery_winner') {
      type = 'new_lottery_winner';
    }
    msgList.push(
      formatTimestamp(parseInt(element.timestampMs)) +
      ' ' +
      formatPlayerName(element.parsedJson.user) +
      '=' +
      element.parsedJson.msg +
      ' ' +
      coinType +
      '=' +
      type +
      '=' +
      element.id.txDigest +
      '=' +
      element.id.eventSeq,
    );
    // console.log(formatTimestamp(parseInt(element.timestampMs)), formatPlayerName(element.parsedJson.user), ':', element.parsedJson.msg, coinType)
  }
  return msgList;
}
