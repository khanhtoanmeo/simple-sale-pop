import Router from 'koa-router';
import {handleNewOrder} from '../controllers/webhookController';

const router = new Router({prefix: '/webhook'});

router.post('/order/new', handleNewOrder);

export default router;
