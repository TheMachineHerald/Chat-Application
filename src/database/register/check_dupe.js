function check_dupe(connection, email) {
  return new Promise((resolve, reject) => {
    const statement = `
      SELECT EXISTS (
        SELECT 1 
        FROM Users
        WHERE email = ?
      )
    `
    connection.query(
      statement, 
      email, 
      (err, results) => {
        if (err) {
            console.log(err)
            return reject(500)
        }

        if (results[0]) {
            console.log("Dupe record found!")
            return reject(404)
        }
        //continue
        return resolve()
    })
  })
}

export default check_dupe