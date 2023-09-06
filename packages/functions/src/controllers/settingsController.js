import {getCurrentShop} from '../helpers/auth';
import {getSetting, updateSetting} from '../repositories/settingsRepository';

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

export async function update(ctx) {
  try {
    const shopID = getCurrentShop(ctx);
    const {data: newSettings} = ctx.req.body;
    console.log('new setting :::::  ', newSettings);
    console.log('shopID :::::  ', shopID);

    await updateSetting(shopID, newSettings);

    ctx.status = 200;
    ctx.body = {
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
