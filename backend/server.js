import './loadEnv.js'
import express , { json } from 'express'
import {set, connect as _connect} from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import user from './routes/user.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const app = express()
app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', user)

set('strictQuery', true)
const url = `mongodb+srv://dbUser:dbUserPassword@cluster0.jefsaxc.mongodb.net/?retryWrites=true&w=majority`
const connect = _connect(url, {
  useNewUrlParser: true,
  autoIndex: false,
})
connect
  .then(() => {
    console.log('connected to db succesfully')
  })
  .catch((err) => {
    console.log(err.message)
  })

const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('welcome to wowbii-api!'))
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})

