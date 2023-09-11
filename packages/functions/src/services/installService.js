import {syncOrdersToNotifications} from '../repositories/notificationsRepository';
import {createSetting} from '../repositories/settingsRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {initialDisplaySettings} from '../const/displaySettings';

export async function installService(ctx) {
  try {
    const {shop: shopifyDomain, accessToken} = ctx.state.shopify;
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);

    const tasks = [
      syncOrdersToNotifications({accessToken, shopId, shopifyDomain}),
      createSetting({...initialDisplaySettings, shopId})
    ];

    await Promise.all(tasks);
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
