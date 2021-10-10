import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  //sanitize data
  res.json({
    statusCode: 200,
    message: "Logged In!"
  })
})

export { router }