import {getCurrentShop} from '../helpers/auth';
import {getSetting} from '../repositories/settingsRepository';

export async function getList(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const settings = await getSetting(shopID);

    ctx.status = 200;
    ctx.body = {
      data: settings,
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
