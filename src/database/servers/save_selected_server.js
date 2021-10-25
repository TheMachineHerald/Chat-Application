function parse(data) {
    const server_channels = {
      text: [],
      voice: []
    }

    try {
        data[1].forEach(row => {
          const tmp = {}
          Object.keys(row).forEach(prop => {
            tmp[prop] = row[prop]
          })

          if (tmp.type === 'TEXT') server_channels.text.push(tmp)
          if (tmp.type === 'VOICE') server_channels.voice.push(tmp)
        })
    } catch(e) {
        console.log(e)
        return null
    } finally {
        return server_channels 
    }
}

function save_selected_server(connection, ctx) {
    console.log('ctx in save selected server: ', ctx)
    return new Promise((resolve, reject) => {
        const update = `
            UPDATE Users
            SET 
              selected_server_id = ${connection.escape(ctx.server_id)},
              selected_server_name = ${connection.escape(ctx.server_name)}
            WHERE id = ${connection.escape(ctx.user_id)}
        `
        const select = `
            SELECT *
            FROM Channels
            WHERE 
              Channels.server_id = ${connection.escape(ctx.server_id)}
            AND
              Channels.user_id = ${connection.escape(ctx.user_id)}
        `
        const statement = [update, select]

        connection.query(statement.join(';'), (err, results) => {
            if (err) reject(500)
            if (!results) {
                console.log("failed query")
                return reject(404)
            }

            console.log('db results > ', results)
            const payload = {
              server_id: ctx.server_id,
              server_name: ctx.server_name,
              channels: parse(results)
            }

            console.log('payload > ', payload)
            return resolve(payload)
        })
    })
}

export default save_selected_server