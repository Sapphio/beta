const passport = require('koa-passport')

class Auth {
  static logout(ctx) {
    ctx.logout()
    ctx.redirect('/')
  }

  static async callback(ctx) {
    await passport.authenticate('tavrn', {
      successRedirect: '/',
      failureRedirect: '/'
    })(ctx)
  }
}

Auth.login = passport.authenticate('tavrn', {
  scope: 'stream messages write_post follow update_profile files'
})

module.exports = Auth
