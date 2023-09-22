const loginCheck = (ctx, next) => {
  if (ctx.session.login !== true) {
    ctx.redirect('/login')
  } else {
    return next();
  }
}

module.exports = loginCheck;