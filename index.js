import express, { json, urlencoded } from "express"
import cors from "cors"
import path from "path"
require("dotenv").config()

const app = express()
const port = process.env.PORT || 8080

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
	res.json({
		statusCode: 200,
		message: "Chat APP Home Route"
	})
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))