import {getNotifications} from '../../repositories/notificationsRepository';
import {getSettingsByShopifyDomain} from '../../repositories/settingsRepository';

export async function handleGetNotifications(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const [settings, notifications] = await Promise.all([
      getSettingsByShopifyDomain(shopifyDomain),
      getNotifications({shopifyDomain})
    ]);
    ctx.body = {
      data: {
        settings,
        notifications
      }
    };
  } catch (error) {
    ctx.status = 500;
    console.log(error);
    return (ctx.body = {
      success: false,
      message: error.message,
      data: {}
    });
  }
}
