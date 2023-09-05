import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';

const firestore = new Firestore();

const collection = firestore.collection('notifications');

export async function getNotifications() {
  const notifications = await collection.get();

  return notifications.docs.map(doc => presentDoc(doc));
}
