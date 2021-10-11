require('dotenv').config()
import express, { json } from 'express'
import API from './src/routes'

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use('/api', API)

app.get('/', (req, res) => {
  res.json({
    statusCode: 200,
    message: "Home Route"
  })
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))