const { Router } = require('express')
const { tagControllers } = require('../controllers')
const { Tag } = require('../db/models')
const { genericMiddlewares, tagMiddlewares } = require('../middlewares')
const { tagSchema } = require('../schemas')
const tagRoutes = Router()

// Metodos
tagRoutes.get('/', tagControllers.getTags)

tagRoutes.get(
    '/:id',
    genericMiddlewares.validateID(Tag),
    genericMiddlewares.existID(Tag),
    tagControllers.getTagById
);

tagRoutes.post(
    '/',
    genericMiddlewares.validatorSchema(tagSchema),
    //tagMiddlewares.existTag,  //crear existTag
    tagControllers.createTag
);

tagRoutes.put(
    '/:id',
    genericMiddlewares.validatorSchema(tagSchema),
    genericMiddlewares.validateID(Tag),
    genericMiddlewares.existID(Tag),
    //tagMiddlewares.existTag,  //crear existTag
    tagControllers.updateTagById
);

tagRoutes.delete(
    '/:id',
    genericMiddlewares.validateID(Tag),
    genericMiddlewares.existID(Tag),
    tagControllers.deleteTagById
);

// Exportacion
module.exports = tagRoutes
