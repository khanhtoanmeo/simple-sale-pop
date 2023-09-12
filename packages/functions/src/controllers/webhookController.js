import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {createNotification} from '../repositories/notificationsRepository';
import {orderToNotificationRestful} from '../helpers/orderToNotification';
import Shopify from 'shopify-api-node';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const {accessToken, id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken
    });

    const notification = await orderToNotificationRestful({
      order: ctx.req.body,
      shopify,
      shopId,
      shopifyDomain
    });

    await createNotification(notification);
    ctx.status = 201;
    return (ctx.body = {
      success: true
    });
  } catch (error) {
    ctx.status = 500;
    console.log('ERROR :::::::::::: ', error.message);
    return (ctx.body = {
      success: false,
      message: error.message
    });
  }
}
