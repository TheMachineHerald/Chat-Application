import bcrypt from 'bcryptjs'
import get_user from './get_user'

function user_login(connection, request) {
  return new Promise((resolve, reject) => {
    const { user_name, password } = request

    get_user()
      .then(user => {
        console.log('user: ', user)
        bcrypt.compare(password, user.passwrd, (err, result) => {
          if (err) reject(500)
          if (!result) reject(404)

          //auth user with session token/cookie
          //for dev just resolve and continue program execution
          return resolve(user)
        })
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

export default user_login