import {boolean, number, object, string} from 'yup';
import {allowShowOptions, positionOptions} from '../const/displaySettings';

export async function updateSettingMiddleware(ctx, next) {
  try {
    const {data} = ctx.req.body;

    const settingSchema = object({
      position: string()
        .oneOf(positionOptions)
        .optional(),
      truncateProductName: boolean().optional(),
      hideTimeAgo: boolean().optional(),
      displayDuration: number().optional(),
      firstDelay: number().optional(),
      popsInterval: number().optional(),
      maxPopsDisplay: number().optional(),
      allowShow: string()
        .oneOf(allowShowOptions)
        .optional(),
      includedUrls: string().optional(),
      excludedUrls: string().optional()
    });

    await settingSchema.validate(data);

    return await next();
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      message: error.message
    });
  }
}
