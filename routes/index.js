const Router = require('@koa/router');
const router = new Router();

router.prefix('/');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {title: "This is from backend"})
});

module.exports = router;
