// require('dotenv').config()
require('dotenv').config({ path: '../.env' })
require('express-async-errors')
const path = require('path')
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

// Database
const connectDB = require('./db/connect')

// User controller
const { addUser } = require('./controllers/userController')

// Upload router
const uploadRouter = require('./routes/uploadRoutes')

// Error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')))
app.use(
  '/upload_images',
  express.static(path.join(__dirname, '../upload_images'))
)

app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

app.get('/', (req, res) => {
  res.send('<h1>Click Fit for On Wave</h1>')
})

// Example route to add a user
app.post('/add-user', (req, res) => {
  const { email, password, type } = req.body
  addUser(email, password, type)
  res.send('User added successfully')
})

app.use('/api/v1/uploadImage', uploadRouter)

// Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

// Function to start the server
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
  })
}

// Attempt to connect to the database and start the server
connectDB.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ', err)
    startServer()
  } else {
    console.log('MySQL connected...')
    startServer()
  }
})
