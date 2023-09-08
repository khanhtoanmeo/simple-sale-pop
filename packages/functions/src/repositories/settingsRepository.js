import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';

const firestore = new Firestore();

const collection = firestore.collection('settings');

export async function getSetting(shopId) {
  const snapshot = await collection.where('shopId', '==', shopId).get();

  return presentDoc(snapshot.docs[0]);
}

export async function updateSetting(id, setting) {
  await collection.doc(id).update(setting);

  return true;
}

export async function createSetting(setting) {
  const docRef = await collection.add(setting);

  return {setting, id: docRef.id};
}

export async function deleteSetting(shopId) {
  // todo : đoạn này giống như đoạn trên , không dùng lại get đâu nhé

  // đoạn này ở part sau em tạm thời chưa sửa mong anh thông cảm, cũng có những cái khó riêng, đến part sau ae mình cùng thảo luận về chủ đề này nhé
  const snapshot = await collection.where('shopId', '==', shopId).get();
  await snapshot.docs[0].ref.delete();

  return true;
}
