const Router = require('@koa/router');
const router = new Router();

router.prefix('/login');


const selectUser = (db, userData) => {
  return new Promise((rs, rj) => {
    const sql = "SELECT id, uuid, username, password FROM user WHERE username=? AND password=?";
    const params = [userData['user'], userData['password']];
    db.query(sql, params, function (error, results, fields) {
      if (error) throw error;
      console.log('The result is: ', results[0]);
    });
  });
}

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body);

  let selectRes = await selectUser(ctx.db, ctx.request.body)

  ctx.body = 200;
});

module.exports = router;
