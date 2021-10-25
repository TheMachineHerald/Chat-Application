/**
 * Parses out MySQL meta data from database response
 * &&
 * Creates User Object for redux consumption
 */
function parse(data) {
    const servers = []
    const server_channels = {
      text: [],
      voice: []
    }

    console.log('parse > rows: ', data[2])

    try {
        data[1].forEach(row => {
          const tmp = {}
          Object.keys(row).forEach(prop => {
            tmp[prop] = row[prop]
          })
          servers.push(tmp)
        })

        data[2].forEach(row => {
          const tmp = {}
          Object.keys(row).forEach(prop => {
            tmp[prop] = row[prop]
          })

          if (tmp.type === 'TEXT') server_channels.text.push(tmp)
          if (tmp.type === 'VOICE') server_channels.voice.push(tmp)
        })
    } catch(e) {
        console.log(e)
    } finally {
        return { 
            ...data[0][0],
            servers: servers,
            selected_server_channels: server_channels
        }
    }
}

export default parse