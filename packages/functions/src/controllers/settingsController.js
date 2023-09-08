import {getCurrentShop} from '../helpers/auth';
import {getSetting, updateSetting} from '../repositories/settingsRepository';

export async function getList(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const settings = await getSetting(shopId);

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
    const {data: newSettings} = ctx.req.body;
    const {id} = ctx.params;
    console.log('IDDDDD', id);

    await updateSetting(id, newSettings);

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
