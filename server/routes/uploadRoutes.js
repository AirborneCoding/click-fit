const express = require('express')
const router = express.Router()

const {
  uploadProductImageLocal,
  fetchImagesList,
} = require('../controllers/uploadController')

router.route('/uploads').post(uploadProductImageLocal)
router.route('/upload_images/list').get(fetchImagesList)

module.exports = router
