require('dotenv').config()
import bcrypt from 'bcryptjs'
import check_dupe from './check_dupe'

function user_register(connection, request) {
  return new Promise((resolve, reject) => {
    const {
      first_name,
      last_name,
      email,
      passwrd
    } = request
    const salt_rounds = process.env.SALT_ROUNDS
    
    check_dupe(connection, email)
      .then(response => {
          bcrypt.genSalt(salt_rounds, (err, salt) => {
            bcrypt.hash(passwrd, salt, (err, hash) => {
              const statement = `
                INSERT INTO Users
                (first_name, last_name, email, passwrd)
                VALUES
                ?, ?, ?, ?
              `

              connection.query(
                statement,
                [first_name, last_name, email, hash],
                (err, results) => {
                  if (err) {
                      console.log(err)
                      return reject(500)
                  }

                  if (!results[0]) {
                      return reject(404)
                  }
                  console.log("successfully registered user: ", results[0])
                  return resolve(results[0])
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