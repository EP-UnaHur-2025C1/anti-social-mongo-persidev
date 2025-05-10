const { Router } = require('express')
const router = Router()
const { imageController } = require('../controllers')
const { existsImage } = require('../middlewares')

router.get('/', imageController.getImages)
router.get('/:id', existsImage, imageController.getImageById)
router.delete('/:id', existsImage, imageController.deleteById)

module.exports = router
