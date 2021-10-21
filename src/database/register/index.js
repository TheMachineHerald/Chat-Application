require('dotenv').config()
import bcrypt from 'bcryptjs'
import check_dupe from './check_dupe'

function user_register(connection, user) {
  return new Promise((resolve, reject) => {
    const {
      first_name,
      last_name,
      user_name,
      email,
      password
    } = user
    const salt_rounds = parseInt(process.env.SALT_ROUNDS)

    check_dupe(connection, email)
      .then(response => {
          bcrypt.genSalt(salt_rounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              const insert = `
                INSERT INTO Users
                (first_name, last_name, user_name, email, passwrd)
                VALUES
                (
                  ${connection.escape(first_name)}, 
                  ${connection.escape(last_name)},
                  ${connection.escape(user_name)},
                  ${connection.escape(email)},
                  ${connection.escape(password)}
                )
              `
              const select = `
                SELECT * FROM
                Users
                WHERE email = ${connection.escape(email)}
              `
              const statement = [insert, select]

              connection.query(
                statement.join(';'),
                (err, results) => {
                  if (err) {
                      console.log(err)
                      return reject(500)
                  }
                  
                  results[1][0].passwrd = password
                  return resolve(results[1][0])
                }
              )
            })
          })
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

export default user_register