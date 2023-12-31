const Router = require('@koa/router');
const router = new Router();

router.prefix('/login');


const selectUser = (db, userData) => {
  return new Promise((rs, rj) => {
    const sql = "SELECT id, uuid, username, password FROM user WHERE username=? AND password=?";
    const params = [userData['user'], userData['password']];
    db.query(sql, params, function (error, results, fields) {
      if (error) {
        rj(error)
      };
      if(results.length == 0) {
        rs(false)
      }
      rs(true)
    });
  });
}

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body);
  let selectRes
  try {
    selectRes = await selectUser(ctx.db, ctx.request.body)
  } catch(err) {
    console.log(err);
  }
  ctx.session.login = selectRes;
  ctx.body = 200;
});

module.exports = router;
