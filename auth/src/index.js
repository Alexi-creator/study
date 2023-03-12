const express = require('express')
const cookieParser = require('cookie-parser')

const { connectDb } = require("./helpers/db")
const { PORT } = require("./configuration/index")

const errorMiddleware = require('./middlewares/error-middleware')

const router = require('./router/index')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/', router)
app.use(errorMiddleware)

const start = () => {
  try {
    app.listen(PORT, () => console.log(`auth service has been started on ${PORT} port!`))
  } catch (e) {
    console.error(e);
  }
}

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", start)