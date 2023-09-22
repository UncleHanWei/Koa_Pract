const Router = require('@koa/router');
const router = new Router();
const loginCheck = require('../middleware/loginCheck');

router.prefix('/');

router.get('/', loginCheck, async (ctx, next) => {
  await ctx.render('index', {title: "This is from backend"})
});


router.get('/login', async (ctx, next) => {
  await ctx.render('login', {title: "This is from backend"})
});

module.exports = router;
