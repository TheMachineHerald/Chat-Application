require('dotenv').config()
import bcrypt from 'bcryptjs'
import check_dupe from './check_dupe'

function user_register(connection, user) {
  return new Promise((resolve, reject) => {
    const {
      first_name,
      last_name,
      email,
      password
    } = user
    const salt_rounds = parseInt(process.env.SALT_ROUNDS)
    
    check_dupe(connection, email)
      .then(response => {
          bcrypt.genSalt(salt_rounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              const statement = `
                INSERT INTO Users
                (first_name, last_name, email, passwrd)
                VALUES
                (?, ?, ?, ?)
              `

              connection.query(
                statement,
                [first_name, last_name, email, hash],
                (err, results) => {
                  if (err) {
                      console.log(err)
                      return reject(500)
                  }
                  
                  return resolve(results)
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