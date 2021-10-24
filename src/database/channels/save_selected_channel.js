function save_selected_channel(connection, ctx) {
  return new Promise((resolve, reject) => {
    const statement = `
      UPDATE Users
      SET
      selected_channel_id = ${connection.escape(ctx.channel_id)},
      selected_channel_name = ${connection.escape(ctx.channel_name)}
      WHERE id = ${connection.escape(ctx.user_id)}
    `

    connection.query(statement, (err, results) => {
      if (err) reject(500)
      if (!results) {
          console.log("failed update")
          return reject(404)
      }

      return resolve()
    })
  })
}

export default save_selected_channel