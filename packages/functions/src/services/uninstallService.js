import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {deleteNotifications} from '../repositories/notificationsRepository';
import {deleteSetting} from '../repositories/settingsRepository';

export async function uninstallService(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    console.log('UNINSTALLING');
    console.log('KKKKKKKKKKK');
    // const tasks = [deleteNotifications(shopId), deleteSetting(shopId)];

    // await Promise.all(tasks);

    return (ctx.body = {
      success: true
    });
  } catch (error) {
    ctx.status = 500;
    console.log(error.message);
    return (ctx.body = {
      success: false,
      message: error.message
    });
  }
}
