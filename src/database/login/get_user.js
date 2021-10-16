function get_user(connection, email) {
  return new Promise((resolve, reject) => {
    const statement = `
      SELECT * FROM
      Users
      WHERE email = ?
    `
    connection.query(
      statement,
      [email],
      (err, results) => {
        if (err) {
            console.log(err)
            return reject(500)
        }

        return resolve(results[0] || results)
      })
  })
}

export default get_user