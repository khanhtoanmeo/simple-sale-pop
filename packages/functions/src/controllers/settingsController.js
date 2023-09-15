import {getCurrentShop} from '../helpers/auth';
import {getSettingsByShopId, updateSetting} from '../repositories/settingsRepository';

export async function get(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const settings = await getSettingsByShopId(shopId);

    return (ctx.body = {
      data: settings,
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

export async function update(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const {data: newSettings} = ctx.req.body;

    await updateSetting(shopId, newSettings);

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
