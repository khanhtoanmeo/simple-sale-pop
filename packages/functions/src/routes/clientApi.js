import Router from 'koa-router';
import {handleGetNotifications} from '../controllers/clientApi/clientApiController';

const router = new Router({prefix: '/clientApi'});

router.get('/notifications', handleGetNotifications);

export default router;
