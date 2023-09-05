import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';

const firestore = new Firestore();

const collection = firestore.collection('settings');

export async function getSetting(shopID) {
  const settings = await collection.where('shopId', '==', shopID).get();

  return presentDoc(settings.docs[0]);
}

export async function updateSetting(id, setting) {
  await collection.doc(id).update(setting);
}
