import {
  syncOrdersToNotifications,
  deleteNotifications
} from '../repositories/notificationsRepository';
import {createSetting, deleteSetting} from '../repositories/settingsRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {initialDisplaySettings} from '../const/displaySettings';
import Shopify from 'shopify-api-node';
import {registerWebhooks} from './shopifyService';

export async function installService(ctx) {
  try {
    const {shop: shopifyDomain, accessToken} = ctx.state.shopify;
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      accessToken,
      shopName: shopifyDomain
    });
    const jobs = [
      syncOrdersToNotifications({shopify, shopId, shopifyDomain}),
      createSetting({...initialDisplaySettings, shopId}),
      registerWebhooks(shopify)
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
    const tasks = [deleteNotifications(shopId), deleteSetting(shopId)];
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
