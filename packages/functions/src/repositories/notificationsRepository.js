import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';
import {orderToNotificationGraphQL} from '../helpers/orderToNotification';
import {getLatestOrdersQueryStr} from '../helpers/graphqlQueries';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export async function getNotifications(shopId) {
  const notifications = await collection.where('shopId', '==', shopId).get();

  return notifications.docs.map(doc => presentDoc(doc));
}

export async function createNotification(notification) {
  return await collection.add(notification);
}

export async function deleteNotifications(shopId) {
  const snapshot = await collection.where('shopId', '==', shopId).get();
  const promises = snapshot.docs.map(doc => doc.ref.delete());

  return await Promise.all(promises);
}

export async function syncOrdersToNotifications({shopify, shopifyDomain, shopId}) {
  const {orders} = await shopify.graphql(getLatestOrdersQueryStr(30));
  const promises = orders.edges.map(({node}) =>
    collection.add(orderToNotificationGraphQL({node, shopId, shopifyDomain}))
  );

  return await Promise.all(promises);
}
