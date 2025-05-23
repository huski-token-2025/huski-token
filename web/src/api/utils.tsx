import { common, contract } from '@/contact/contact';
import axios from 'axios';
import { apiTestnet } from './api';

export function getObject(objectId: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'sui_getObject',
        params: [
          objectId,
          {
            showType: false,
            showOwner: false,
            showPreviousTransaction: false,
            showDisplay: false,
            showContent: true,
            showBcs: false,
            showStorageRebate: true,
          },
        ],
      })
      .then((response) => {
        resolve(response.data.result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//
export function getOwnedObjects(address: any, filter: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'suix_getOwnedObjects',
        params: [address, filter],
      })
      .then((response) => {
        resolve(response.data.result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getOwnedTickets(address: any): Promise<any> {
  return getOwnedObjects(address, {
    filter: {
      MatchAll: [{ StructType: contract.ADDRESS.structTypeTicket }, { AddressOwner: address }],
    },
    options: {
      showType: false,
      showOwner: false,
      showPreviousTransaction: false,
      showDisplay: false,
      showContent: true,
      showBcs: false,
      showStorageRebate: false,
    },
  });
}
export function getOwnedSui(address: any): Promise<any> {
  return getOwnedObjects(address, {
    filter: {
      MatchAll: [{ StructType: contract.ADDRESS.structType1 }, { AddressOwner: address }],
    },
    options: {
      showType: true,
      showOwner: true,
      showPreviousTransaction: true,
      showDisplay: false,
      showContent: false,
      showBcs: false,
      showStorageRebate: false,
    },
  });
}

export function getOwnedSuiLottery(address: any): Promise<any> {
  return getOwnedObjects(address, {
    filter: {
      MatchAll: [{ StructType: '0x2::coin::Coin<0x2::sui::SUI>' }, { AddressOwner: address }],
    },
    options: {
      showType: true,
      showOwner: true,
      showPreviousTransaction: true,
      showDisplay: false,
      showContent: false,
      showBcs: false,
      showStorageRebate: false,
    },
  });
}

export function getOwnedSSHARE(address: any): Promise<any> {
  return getOwnedObjects(address, {
    filter: {
      MatchAll: [
        {
          StructType: contract.ADDRESS.structType2,
        },
        {
          AddressOwner: address,
        },
      ],
    },
    options: {
      showType: false,
      showOwner: false,
      showPreviousTransaction: false,
      showDisplay: false,
      showContent: true,
      showBcs: false,
      showStorageRebate: false,
    },
  });
}
async function queryEvents(EventType: any, nextCursor: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'suix_queryEvents',
        params: [
          {
            MoveEventType: EventType,
          },
          nextCursor,
          common.PAGE_SIZE,
          true,
        ],
      })
      .then((response) => {
        resolve(response.data.result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export async function queryEventsAll(EventType: any, limit: any): Promise<any> {
  return new Promise(async (resolve) => {
    let hasNextPage = true;
    let nextCursor = null;
    let result = await queryEvents(EventType, nextCursor);
    let data = result.data;
    if (limit > common.PAGE_SIZE) {
      while (hasNextPage) {
        result = await queryEvents(EventType, result.nextCursor);
        hasNextPage = result.hasNextPage;
        nextCursor = result.nextCursor;
        // console.log(result.hasNextPage, result.nextCursor)
        result.data.forEach((element: any) => {
          data.push(element);
        });
        if (data.length >= limit) break;
      }
    }
    // console.log(data.length)
    resolve(data.slice(0, limit));
  });
}
//vip
export async function getEventNewVip(): Promise<any> {
  return new Promise(async (resolve) => {
    let data = await queryEventsAll(contract.ADDRESS.eventTypeNewVip, common.LIMIT_EVENT);
    resolve(data);
  });
}
export function getEffects(digest: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'sui_getTransactionBlock',
        params: [
          digest,
          {
            showInput: false,
            showRawInput: false,
            showEffects: true,
            showEvents: false,
            showObjectChanges: false,
            showBalanceChanges: false,
            showRawEffects: false,
          },
        ],
      })
      .then((response) => {
        resolve(response.data.result.effects.created[0].reference.objectId);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getNewLotteryEffects(digest: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'sui_getTransactionBlock',
        params: [
          digest,
          {
            showInput: false,
            showRawInput: false,
            showEffects: true,
            showEvents: false,
            showObjectChanges: true,
            showBalanceChanges: false,
            showRawEffects: false,
          },
        ],
      })
      .then((response) => {
        let data = response.data.result.effects.created;
        // console.log(data)
        data.forEach((element: { owner: { Shared: any }; reference: { objectId: any } }) => {
          // console.log(element.owner)
          if (element.owner.Shared) {
            // console.log(element.reference.objectId)
            resolve(element.reference.objectId);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getVipObject(vipId: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'sui_getObject',
        params: [
          vipId,
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
      })
      .then((response) => {
        resolve(response.data.result.data.content.fields);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function formatPlayerName(playerName: string) {
  if (playerName.length <= 10) {
    return playerName;
  } else {
    return playerName.substring(0, 6) + '...' + playerName.substring(playerName.length - 4);
  }
}
