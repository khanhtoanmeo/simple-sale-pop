import Shopify from 'shopify-api-node';
import appConfig from '@functions/config/app';
import {prepareNotificationGraphQL} from '../helpers/prepareNotification';
import {createNotification} from '../repositories/notificationsRepository';

const queryStr = `{
  orders(first:30,sortKey:CREATED_AT,reverse:true) {
    edges {
      node {
        createdAt
        billingAddress{
          firstName
          city
          country
        }
        lineItems(first:1){
          edges{
            node{
              product{
                id
                title
                featuredImage{
                  url
                }     
              }
            }
          }
        }   
      }
    }
  }
}`;

export async function registerWebhooks(shopify) {
  const baseUrl = `https://${appConfig.baseUrl}`;
  const webhooks = [
    {
      path: `/webhook/order/new`,
      topic: 'orders/create'
    }
  ];

  return await Promise.all(
    webhooks.map(({path, topic}) =>
      shopify.webhook.create({
        address: baseUrl + path,
        topic
      })
    )
  );
}

export async function registerScriptTags(shopify) {
  const baseUrl = 'https://localhost:3000';
  const scriptTags = [{path: '/scripttag/avada-sale-pop.min.js', event: 'onload'}];

  return await Promise.all(
    scriptTags.map(({path, event}) =>
      shopify.scriptTag.create({
        src: baseUrl + path,
        event
      })
    )
  );
}

export async function syncOrdersToNotifications({shopify, shopifyDomain, shopId}) {
  const {orders} = await shopify.graphql(queryStr);

  const promises = orders.edges.map(({node}) =>
    createNotification(prepareNotificationGraphQL({node, shopId, shopifyDomain}))
  );

  return await Promise.all(promises);
}

export function initShopify({accessToken, shopifyDomain}) {
  return new Shopify({accessToken, shopName: shopifyDomain});
}
