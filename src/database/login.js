function user_login(connection, request) {
  return new Promise((resolve, reject) => {
    const { user_name, password } = request
    const statement = `
      SELECT * FROM
      Users
      WHERE email = ?
      AND passwrd = ?
    `
    connection.query(
      statement, 
      [user_name, password],
      (err, results) => {
        if (err) {
            console.log(err)
            return reject(500)
        }

        if (!results[0]) {
            return reject(404)
        }

        return resolve(results[0])
      })
  })
}

export default user_login