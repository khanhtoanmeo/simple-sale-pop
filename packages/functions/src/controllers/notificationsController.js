import {getCurrentShop} from '../helpers/auth';
import {getNotificationsWithPagination} from '../repositories/notificationsRepository';

export async function getList(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const {count, notifications, pageInfo} = await getNotificationsWithPagination({
      ...ctx.query,
      shopId,
      page: parseInt(ctx.query.page),
      limit: parseInt(ctx.query.limit)
    });

    return (ctx.body = {
      data: notifications,
      success: true,
      count,
      pageInfo
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      message: error.message
    });
  }
}
