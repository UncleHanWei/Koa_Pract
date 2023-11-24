const Router = require('@koa/router');
const router = new Router();


router.prefix('/todo');


let getItemsByStatus = (db, status) => {
  return new Promise((rs, rj) => {
    let sql = "SELECT * FROM item WHERE status = ?";
    let params = [status]
    db.query(sql, params, function (error, results, fields) {
      if (error) {
        rj(error)
      };
      rs(results)
    });
  })
}

let getUnfinishItems = async (db) => {
  let res;
  try {
    res = await getItemsByStatus(db, false);
  } catch (error) {
    res = error
  }
  return res;
};

let getFinishItems = async (db) => {
  let res;
  try {
    res = await getItemsByStatus(db, true);
  } catch (error) {
    res = error
  }
  return res;
};


let addItem = (db, formData) => {
  return new Promise((rs, rj) => {
    let sql = "INSERT INTO `item`(`due_time`, `content`) VALUES (?, ?)";
    let params = [formData?.due_time, formData?.content];
    db.query(sql, params, function(error, results, fields) {
      if(error) {
        rj(error);
      }
      rs(200);
    })
  });
}


router.get('/unfinished', async (ctx, next) => {
  let res;
  try {
    res = await getUnfinishItems(ctx.db);
  } catch (error) {
    console.log(error);
  }
  ctx.body = res;
});


router.get('/finished', async (ctx, next) => {
  let res;
  try {
    res = await getFinishItems(ctx.db);
  } catch (error) {
    console.log(error);
  }
  ctx.body = res;
});


router.post('/item', async (ctx, next) => {
  let res;
  console.log(ctx.request.body);
  let formData = ctx.request.body;
  try {
    res = await addItem(ctx.db, formData);
  } catch (error) {
    console.log(error);
  }
  ctx.body = res;
});

module.exports = router;
