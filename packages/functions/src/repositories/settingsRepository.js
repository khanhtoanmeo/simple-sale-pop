import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';

const firestore = new Firestore();

const collection = firestore.collection('settings');

export async function getSetting(shopId) {
  //todo: cái này dùng id của setting cho dễ nhé , dùng id của shop không ổn , giả dụ như có 2 setting của cùng 1 shop cho 2 phần khác nhau thì sao  thì sao 
  const snapshot = await collection.where('shopId', '==', shopId).get();
  return presentDoc(snapshot.docs[0]);
}


export async function updateSetting(shopId, setting) {
  // todo : không dùng get dùng id của setting để update , dùng get lại tốn thên 1 lần query lên nữa
  const snapshot = await collection.where('shopId', '==', shopId).get();
  await snapshot.docs[0].ref.update(setting);

  return true;
}

export async function createSetting(setting) {
  const docRef = await collection.add(setting);
  return {setting, id: docRef.id};
}

export async function deleteSetting(shopId) {
  // todo : đoạn này giống như đoạn trên , không dùng lại get đâu nhé 
  const snapshot = await collection.where('shopId', '==', shopId).get();
  await snapshot.docs[0].ref.delete();

  return true;
}
