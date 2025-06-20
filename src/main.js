const app = require('./app')
// Importacion de rutas
const { tagRoutes, postRoutes, userRoutes, commentRoutes, imageRoutes } = require('./routes')

// Uso de las rutas
app.use('/tags', tagRoutes)
app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)
app.use('/images', imageRoutes)
