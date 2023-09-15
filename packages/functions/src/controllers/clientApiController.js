import {getNotifications} from '../repositories/notificationsRepository';
import {getSettingsByShopifyDomain} from '../repositories/settingsRepository';

//todo: tách hẳn 1 thư mục cho clientApi nhé 

export async function getClientData(ctx) {
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
