import { common, contract } from '@/contact/contact';
import { TransactionBlock } from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';
import { getEffects, getEventNewVip, getVipObject } from './utils';

export async function handleCheckVip(wallet: WalletContextState) {
  // console.log(wallet.address);
  const newVipData = await getEventNewVip();
  let isExist = false;
  newVipData.forEach((element: { sender: string | undefined }) => {
    if (element.sender === wallet.address) {
      isExist = true;
    }
  });
  return isExist;
}

const contractModule = 'mine';
export async function handleGetVip(wallet: WalletContextState) {
  const newVipData = await getEventNewVip();
  let isExist = false;
  newVipData.forEach((element: { sender: string | undefined }) => {
    if (element.sender === wallet.address) {
      isExist = true;
      console.log('you already have a vip object');
      return false;
    }
  });
  if (!isExist) {
    const contractMethod = 'get_new_vip';
    try {
      const tx = new TransactionBlock();

      tx.moveCall({
        target: `${common.contractAddress}::${contractModule}::${contractMethod}`,
        typeArguments: [contract.ADDRESS.coinType1, contract.ADDRESS.coinType2],
        arguments: [tx.object(contract.ADDRESS.bankId)],
      });

      await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      // console.log('executeMoveCall success', resData);
      // console.log('Vip collection succeed!');
      isExist = true;
      return isExist;
    } catch (e) {
      // console.error('executeMoveCall failed', e);
      // alert('executeMoveCall failed (see response in the console)');
    }
  }
}
export async function handleGetEventNewVip(wallet: WalletContextState) {
  try {
    const newVipData = await getEventNewVip();
    if (newVipData) {
      let digest = '';
      newVipData.forEach((element: { sender: string | undefined; id: { txDigest: string } }) => {
        if (element.sender === wallet.address) {
          digest = element.id.txDigest;
        }
      });
      // console.log(digest)

      const vipId = await getEffects(digest);
      // console.log(vipId)

      // console.log(vipInfo)
      return await getVipObject(vipId);
      // alert(JSON.stringify(vipInfo))
    } else {
      return undefined;
    }
  } catch (error) {
    // console.error(error);
    return undefined;
  }
}

export async function handleRedeemVip(wallet: WalletContextState) {
  const newVipData = await getEventNewVip();
  if (newVipData) {
    let digest = '';
    newVipData.forEach((element: { sender: string | undefined; id: { txDigest: string } }) => {
      if (element.sender === wallet.address) {
        digest = element.id.txDigest;
      }
    });
    // console.log(digest);

    const vipId = await getEffects(digest);
    // console.log(vipId);
    const vipInfo = await getVipObject(vipId);
    // console.log(vipInfo)
    if (vipInfo.premium > 0) {
      try {
        const tx = new TransactionBlock();
        const contractMethod = 'redeem_vip_premium';

        tx.moveCall({
          target: `${common.contractAddress}::${contractModule}::${contractMethod}`,
          typeArguments: [contract.ADDRESS.coinType1, contract.ADDRESS.coinType2],
          arguments: [tx.object(contract.ADDRESS.bankId), tx.object(vipId)],
        });

        // console.log('executeMoveCall success', resData);
        // alert('executeMoveCall succeeded (see response in the console)');
        return await wallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
      } catch (e) {
        // console.error('executeMoveCall failed', e);
        // alert('executeMoveCall failed (see response in the console)');
        return null;
      }
    } else {
      // console.log('zero premium.');
      return 'zero premium.';
    }
  }
}
