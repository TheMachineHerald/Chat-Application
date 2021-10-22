function get_user_messages(connection, user_id, recipient_id) {
  console.log('channel id in get_user_messages: ', channel_id)
  return new Promise((resolve, reject) => {
    const statement = `
      SELECT * FROM
      User_Messages
      WHERE user_id = ?
      ORDER BY create_date
      DESC LIMIT 50;
    `

    connection.query(statement, [user_id], (err, results) => {
      if (err) reject(500)
      if (!results) {
          console.log("not found")
          return reject(404)
      }

      console.log('get channel messages results: ', results)
      return resolve(results)
    })
  })
}

export default get_user_messages