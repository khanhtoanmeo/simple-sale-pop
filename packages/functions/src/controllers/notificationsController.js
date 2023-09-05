import {getNotifications} from '../repositories/notificationsRepository';

export async function getList(ctx) {
  try {
    const notifications = await getNotifications();

    ctx.status = 200;
    ctx.body = {
      data: notifications,
      success: true
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error.message
    };
  }
}
