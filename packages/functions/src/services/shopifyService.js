import Shopify from 'shopify-api-node';
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
  const webhooks = [
    {
      address: 'https://27b5-171-224-179-131.ngrok.io/webhook/order/new',
      topic: 'orders/create',
      format: 'json'
    }
  ];
  return await Promise.all(webhooks.map(webhook => shopify.webhook.create(webhook)));
}

export async function registerScriptTags(shopify) {
  const scriptTags = [
    {src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js', event: 'onload'}
  ];

  return await Promise.all(scriptTags.map(scriptTag => shopify.scriptTag.create(scriptTag)));
}

export async function syncOrdersToNotifications({shopify, shopifyDomain, shopId}) {
  const {orders} = await shopify.graphql(queryStr);

  const promises = orders.edges.map(({node}) =>
    createNotification(orderToNotificationGraphQL({node, shopId, shopifyDomain}))
  );

  return await Promise.all(promises);
}

export function orderToNotificationGraphQL({node, shopId, shopifyDomain}) {
  const {createdAt, billingAddress, lineItems = []} = node;
  const {firstName, city, country} = billingAddress || {};
  const {id, title, featuredImage} = lineItems.edges[0].node.product || {};

  return {
    firstName,
    city,
    country,
    productId: id,
    productName: title,
    productImage: featuredImage.url,
    timestamp: new Date(createdAt),
    shopId,
    shopifyDomain
  };
}

export async function orderToNotificationRestful({shopify, order, shopId, shopifyDomain}) {
  const {
    line_items: lineItems = [],
    billing_address: billingAddress,
    created_at: timestamp
  } = order;
  const {first_name: firstName, city, country} = billingAddress || {};
  const {product_id: productId, title: productName} = lineItems[0] || {};
  const {
    image: {src: productImage}
  } = await shopify.product.get(parseInt(productId));

  return {
    city,
    country,
    firstName,
    productId: 'gid://shopify/Product/' + productId,
    productImage,
    productName,
    timestamp: new Date(timestamp),
    shopId,
    shopifyDomain
  };
}

export function initShopify({accessToken, shopifyDomain}) {
  return new Shopify({accessToken, shopName: shopifyDomain});
}
