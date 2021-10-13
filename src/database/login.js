function user_login(connection, user) {
  return new Promise((resolve, reject) => {
    const { userName, password } = user
    const statement = `
      SELECT * FROM
      users
      WHERE email = '${userName}'
      AND password = '${password}'
    `
    connection.query(statement, (err, results) => {
      //need to create err handler middleware
      if (err) console.log(err)
      if (!results[0]) {
          return reject(404)
      }
      return resolve(results[0])
    })
  })
}

export default user_login