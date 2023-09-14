import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../presenters/documentPresenter';
import {presentSetting} from '../presenters/settingPresenter';

const firestore = new Firestore();

const collection = firestore.collection('settings');

export async function getSettingByShopId(shopId) {
  const snapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  return presentSetting(presentDoc(snapshot.docs[0]));
}

export async function getSettingByShopifyDomain(shopifyDomain) {
  const snapshot = await collection
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get();

  return presentSetting(presentDoc(snapshot.docs[0]));
}

export async function updateSetting(shopId, setting) {
  const snapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  return await snapshot.docs[0].ref.update(setting);
}

export async function createSetting({setting}) {
  const docRef = await collection.add(setting);
  return {setting: setting, id: docRef.id};
}

export async function deleteSetting(shopId) {
  const snapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  return await snapshot.docs[0].ref.delete();
}
