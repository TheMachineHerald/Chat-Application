import bcrypt from 'bcryptjs'
import get_user from './get_user'

function user_login(connection, request) {
  return new Promise((resolve, reject) => {
    const { email, password } = request

    console.log("user_login: ", email, password)

    get_user(connection, email)
      .then(user => {
        bcrypt.compare(password, user.passwrd.toString(), (err, result) => {
          if (err) {
            console.log('err in bcrypt compare: ', err)
            return reject(500)
          }
          if (!result) reject(404)

          //auth user with session token/cookie
          //for dev just resolve and continue program execution
          user.passwrd = password
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