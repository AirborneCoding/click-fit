const connectDB = require('../db/connect')
const CustomError = require('../errors')

const addUser = (email, password, type, req, res) => {
  const query = 'CALL addUser(?, ?, ?)'
  connectDB.query(query, [email, password, type], (err, results) => {
    if (err) {
      console.log('Error inserting user:', err)
      throw new CustomError.BadRequestError('Error inserting user')
    } else {
      console.log('User added successfully:', results)
    }
  })
}

module.exports = { addUser }
