const Router = require('@koa/router');
const router = new Router();

router.prefix('/login');

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 200;
});

module.exports = router;
