import {syncOrdersToNotifications} from '../repositories/notificationsRepository';
import {createSetting} from '../repositories/settingsRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {initialDisplaySettings} from '../const/displaySettings';
import Shopify from 'shopify-api-node';

export async function installService(ctx) {
  try {
    const {shop: shopifyDomain, accessToken} = ctx.state.shopify;
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      accessToken,
      shopName: shopifyDomain
    });
    const tasks = [
      syncOrdersToNotifications({shopify, shopId, shopifyDomain}),
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
