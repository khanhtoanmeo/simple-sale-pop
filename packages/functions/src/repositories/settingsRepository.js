import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';

const firestore = new Firestore();

const collection = firestore.collection('settings');

export async function getSetting(shopId) {
  const snapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  return presentDoc(snapshot.docs[0]);
}

export async function updateSetting(shopId, setting) {
  const snapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  return await snapshot.docs[0].ref.update(setting);
}

export async function createSetting(setting) {
  const docRef = await collection.add(setting);

  return {setting, id: docRef.id};
}

export async function deleteSetting(shopId) {
  const snapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  return await snapshot.docs[0].ref.delete();
}
