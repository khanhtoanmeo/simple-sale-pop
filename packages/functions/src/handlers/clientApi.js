import App from 'koa';
import cors from '@koa/cors';
import router from '../routes/clientApi';

const api = new App();
api.proxy = true;

api.use(cors({origin: '*'}));
api.use(router.allowedMethods());
api.use(router.routes());

export default api;
