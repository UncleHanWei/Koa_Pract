const Router = require('@koa/router');
const router = new Router();

router.prefix('/user');

router.get('/', async (ctx, next) => {
  ctx.body = '<h1>User</h1>';
});

module.exports = router;
