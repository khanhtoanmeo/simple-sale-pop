import {getCurrentShop} from '../helpers/auth';
import {getNotifications} from '../repositories/notificationsRepository';

export async function getList(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const notifications = await getNotifications(shopId);

    return (ctx.body = {
      data: notifications,
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
