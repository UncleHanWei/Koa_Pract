const Router = require('@koa/router');
const router = new Router();
const todoListRouter = require('./todo_list');
// const loginCheck = require('../middleware/loginCheck');

router.prefix('/api');

router.use(todoListRouter.routes(), todoListRouter.allowedMethods());

module.exports = router;
