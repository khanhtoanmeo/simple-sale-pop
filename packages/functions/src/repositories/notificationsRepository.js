import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';
import Shopify from 'shopify-api-node';
import {orderToNotification} from '../helpers/orderToNotification';
import {getLatestOrdersQueryStr} from '../helpers/graphqlQueries';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export async function getNotifications(shopID) {
  const notifications = await collection.where('shopId', '==', shopID).get();

  return notifications.docs.map(doc => presentDoc(doc));
}

export async function syncOrdersToNotifications({accessToken, shopifyDomain, shopId}) {
  const shopify = new Shopify({
    accessToken,
    shopName: shopifyDomain
  });

  const {orders} = await shopify.graphql(getLatestOrdersQueryStr(30));
  const promises = orders.edges.map(({node}) =>
    collection.add(orderToNotification({node, shopId, shopifyDomain}))
  );
  await Promise.all(promises);
  // todo: chuyển thành return {success : true} nhé ,

  return true;
}

export async function deleteNotifications(shopId) {
  const snapshot = await collection.where('shopId', '==', shopId).get();
  const promises = snapshot.docs.map(doc => doc.ref.delete());
  await Promise.all(promises);

  return true;
}
