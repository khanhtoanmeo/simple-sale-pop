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
      shopify
    });

    await createNotification({
      ...notification,
      shopId,
      shopifyDomain
    });
    return (req.body = {
      success: true
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      message: error.message
    });
  }
}
