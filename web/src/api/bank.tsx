import { apiTestnet } from '@/api/api';
import {ADDRESS_BLUB, ADDRESS_HUSKI, ADDRESS_SUI, contract} from '@/contact/contact';
import axios from 'axios';

export async function handleGetHousecut(bankId: any): Promise<any> {
  return new Promise(async (resolve) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'sui_getObject',
        params: [
          bankId,
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
      .then(async function (response) {
        let data = response.data.result.data;
        // console.log(data.content.fields.house_cut)
        resolve(data.content.fields.house_cut);
        // alert(JSON.stringify(data.content.fields.house_cut))
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
export async function handleGetHousecuts(): Promise<any> {
  const housecutSui = await handleGetHousecut(ADDRESS_SUI.bankId);
  const housecutHuski = await handleGetHousecut(ADDRESS_HUSKI.bankId);
  const housecutBlub = await handleGetHousecut(ADDRESS_BLUB.bankId);
  const result = { housecutSui, housecutHuski, housecutBlub };
  return result;
}

export async function handleBankInfos() {
  return new Promise((resolve) => {
    axios
      .post(apiTestnet, {
        jsonrpc: '2.0',
        id: 1,
        method: 'sui_getObject',
        params: [
          contract.ADDRESS.bankId,
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
      .then(async function (response) {
        resolve(response.data.result.data.content.fields);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
