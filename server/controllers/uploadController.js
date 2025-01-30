const path = require('path')
const fs = require('fs')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded')
  }
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image')
  }
  const maxSize = 1024 * 1024
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1MB')
  }
  const imagePath = path.join(
    __dirname,
    // '../client/uploads/' + `${productImage.name}`
    '../../upload_images/' + `${productImage.name}`
  )
  await productImage.mv(imagePath)
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}


const fetchImagesList = async (req, res) => {
  const directoryPath = path.join(__dirname, '../../upload_images')
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files')
    }
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/.test(file)
    )
    res.send(imageFiles.map((filename) => ({ filename })))
  })
}

// app.get('/upload_images/list', (req, res) => {
//   const directoryPath = path.join(__dirname, 'upload_images')
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return res.status(500).send('Unable to scan files')
//     }
//     const imageFiles = files.filter((file) =>
//       /\.(jpg|jpeg|png|gif)$/.test(file)
//     )
//     res.send(imageFiles.map((filename) => ({ filename })))
//   })
// })

module.exports = {
  uploadProductImageLocal,
  fetchImagesList,
}
