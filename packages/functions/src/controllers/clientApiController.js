import {getNotifications} from '../repositories/notificationsRepository';
import {getSettingByShopifyDomain} from '../repositories/settingRepository';

export async function getShopData(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const [setting, notifications] = await Promise.all([
      getSettingByShopifyDomain(shopifyDomain),
      getNotifications({shopifyDomain})
    ]);
    ctx.body = {
      data: {
        setting,
        notifications
      }
    };
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      message: error.message
    });
  }
}
