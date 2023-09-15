import Router from 'koa-router';
import {listenNewOrder} from '../controllers/webhookController';

//todo: cái chỗ này trong video anh TA bảo để tách ra hả ? nếu thế thì để nguyên không thì gộp vào clientApi nhé .

const router = new Router({prefix: '/webhook'});

router.post('/order/new', listenNewOrder);

export default router;
