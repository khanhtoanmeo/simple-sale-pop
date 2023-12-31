import Router from 'koa-router';
import {handleNewOrder} from '../controllers/ordersController';

const router = new Router({prefix: '/webhook'});

router.post('/order/new', handleNewOrder);

export default router;
