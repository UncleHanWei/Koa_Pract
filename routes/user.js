const Router = require('@koa/router');
const router = new Router();

router.prefix('/user');

router.get('/', async (ctx, next) => {
  ctx.body = '<h1>User</h1>';
});

router.get('/test/:id', async (ctx, next) => {
  ctx.body = '<h1>User</h1>';
  console.log(ctx.params);
});

module.exports = router;
