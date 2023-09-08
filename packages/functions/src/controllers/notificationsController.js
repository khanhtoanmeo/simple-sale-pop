import {getCurrentShop} from '../helpers/auth';
import {getNotifications} from '../repositories/notificationsRepository';

export async function getList(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const notifications = await getNotifications(shopID);

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
