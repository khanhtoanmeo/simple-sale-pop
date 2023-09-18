import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {createNotification} from '../repositories/notificationsRepository';
import {initShopify} from '../services/shopifyService';
import {prepareNotificationRestful} from '../helpers/prepareNotification';

export async function handleNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const {accessToken, id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify({accessToken, shopifyDomain});

    const notification = await prepareNotificationRestful({
      order: ctx.req.body,
      shopify
    });

    await createNotification({...notification, shopId, shopifyDomain});

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
