import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {createNotification} from '../repositories/notificationsRepository';
import {initShopify, orderToNotificationRestful} from '../services/shopifyService';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const {accessToken, id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify({accessToken, shopifyDomain});

    const notification = await orderToNotificationRestful({
      order: ctx.req.body,
      shopify,
      shopId,
      shopifyDomain
    });

    await createNotification(notification);
    
    ctx.status = 200;
    return (ctx.body = {
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
