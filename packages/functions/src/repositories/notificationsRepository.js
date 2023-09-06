import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';

const firestore = new Firestore();

const collection = firestore.collection('notifications');

export async function getNotifications(shopID) {
  const notifications = await collection.where('shopId', '==', shopID).get();

  return notifications.docs.map(doc => presentDoc(doc));
}
