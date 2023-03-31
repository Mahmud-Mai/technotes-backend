const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
// middleware imports
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler')
const { logger } = require('./middleware/logger')


// middlewareS
app.use(logger)
app.use(cookieParser())
app.use(cors(corsOptions))

// built-in middleware
app.use(express.static('public'))
app.use(express.json())


app.use('/', require('./routes/root'))

app.all('*', (req, res)=> {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({ message: '404 not found'})
    } else {
        res.type('txt').send('404.html')
    }
})


// errorHandler middleare
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))