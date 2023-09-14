import Router from 'koa-router';
import {getShopData} from '../controllers/clientApiController';

const router = new Router({prefix: '/clientApi'});

router.get('/shopData', getShopData);

export default router;
