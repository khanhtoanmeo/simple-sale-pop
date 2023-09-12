import {Firestore} from '@google-cloud/firestore';
import presentDoc from '../helpers/presentDoc';
import {orderToNotificationGraphQL} from '../helpers/orderToNotification';
import {getLatestOrdersQueryStr} from '../helpers/graphqlQueries';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export async function getNotifications({shopId, limit, page, sort, after, before}) {
  let query = collection.where('shopId', '==', shopId);
  const {count} = (await collection.count().get()).data();

  const [field, direction] = sort.split(':');
  query = query.orderBy(field, direction);
  if (after || before) {
    const cursorValue = await collection.doc(after || before).get();
    query = after
      ? query.startAfter(cursorValue).limit(limit)
      : query.endBefore(cursorValue).limitToLast(limit);
  } else query = query.limit(limit);

  const notifications = await query.get();

  return {
    count,
    notifications: notifications.docs.map(doc => presentDoc(doc)),
    pageInfo: {
      hasNext: page * limit < count,
      hasPre: page > 1
    }
  };
}

export async function createNotification(notification) {
  return await collection.add(notification);
}

export async function deleteNotifications(shopId) {
  const snapshot = await collection.where('shopId', '==', shopId).get();
  const promises = snapshot.docs.map(doc => doc.ref.delete());

  return await Promise.all(promises);
}


// todo: phần sync này chuyển sang shopifyService nhé  
export async function syncOrdersToNotifications({shopify, shopifyDomain, shopId}) {
  //todo : chuyển phần get notifications sang shopifyService nhé .
  const {orders} = await shopify.graphql(getLatestOrdersQueryStr(30));
  const promises = orders.edges.map(({node}) =>
    collection.add(orderToNotificationGraphQL({node, shopId, shopifyDomain}))
  );

  return await Promise.all(promises);
}
