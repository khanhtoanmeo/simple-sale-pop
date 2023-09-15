import Router from 'koa-router';
import {getClientData} from '../controllers/clientApiController';

const router = new Router({prefix: '/clientApi'});

//todo: handleGetNotifications
router.get('/notifications', getClientData);

export default router;
