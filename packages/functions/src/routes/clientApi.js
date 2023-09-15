import Router from 'koa-router';
import {getClientData} from '../controllers/clientApiController';

const router = new Router({prefix: '/clientApi'});

router.get('/notifications', getClientData);

export default router;
