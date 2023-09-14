import {deleteNotifications} from '../repositories/notificationsRepository';
import {createSetting, deleteSetting} from '../repositories/settingRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {defaultDisplaySettings} from '../const/displaySettings';
import {
  initShopify,
  registerScriptTags,
  registerWebhooks,
  syncOrdersToNotifications
} from './shopifyService';

export async function installService(ctx) {
  try {
    const {shop: shopifyDomain, accessToken} = ctx.state.shopify;
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify({accessToken, shopifyDomain});
    const jobs = [
      syncOrdersToNotifications({shopify, shopId, shopifyDomain}),
      createSetting({setting: {...defaultDisplaySettings, shopId, shopifyDomain}}),
      registerWebhooks(shopify),
      registerScriptTags(shopify)
    ];

    await Promise.all(jobs);

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

export async function uninstallService(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const jobs = [deleteNotifications(shopId), deleteSetting(shopId)];

    await Promise.all(jobs);

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
