function get_channels(connection, user_id) {
  console.log('user id in get_channels: ', user_id)
  return new Promise((resolve, reject) => {
    const statement = `
      SELECT * FROM
      Channels
      WHERE created_by_user_id = ?;
    `
    connection.query(statement, [user_id], (err, results) => {
      if (err) reject(500)
      if (!results) {
          console.log("not found")
          return reject(404)
      }

      console.log('get channels results: ', results)
      return resolve(results)
    })
  })
}

export default get_channels