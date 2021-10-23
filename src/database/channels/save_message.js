function save_message(connection, ctx) {
  console.log('context in save_message: ', ctx)
  return new Promise((resolve, reject) => {
    const statement = `
      INSERT INTO Channel_Messages
      (channel_id, server_id, user_id, user_name, message)
      VALUES
      (?, ?, ?, ?, ?)
    `
    const values = [
      ctx.channel_id,
      ctx.server_id,
      ctx.user_id,
      ctx.user_name,
      ctx.message
    ]

    connection.query(statement, values, (err, results) => {
      if (err) reject(500)
      if (!results) {
        console.log('failed message insert')
        return reject(404)
      }

      console.log('save channel message results')
      return resolve()
    })
  })
}

export default save_message