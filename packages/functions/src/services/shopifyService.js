import {getLatestOrdersQueryStr} from '../helpers/graphqlQueries';
import {orderToNotificationGraphQL} from '../helpers/orderToNotification';
import {createNotification} from '../repositories/notificationsRepository';

export async function registerWebhooks(shopify) {
  const webhooks = [
    {
      address: 'https://5fac-123-17-158-3.ngrok.io/webhook/order/new',
      topic: 'orders/create',
      format: 'json'
    }
  ];

  return await Promise.all(webhooks.map(webhook => shopify.webhook.create(webhook)));
}

export async function syncOrdersToNotifications({shopify, shopifyDomain, shopId}) {
  const {orders} = await shopify.graphql(getLatestOrdersQueryStr(30));
  const promises = orders.edges.map(({node}) =>
    createNotification(orderToNotificationGraphQL({node, shopId, shopifyDomain}))
  );

  return await Promise.all(promises);
}
