//imports
const { config } = require("dotenv")
const express = require("express")

const userRoutes = require("./src/routes/userprofileRoutes")
const authorRoutes = require("./src/routes/authorRoutes")
const bookRoutes = require("./src/routes/detailBookRoutes")



const bodyParser = require("body-parser")
require('dotenv').config();

//consts
const PORT = process.env.PORT || 3002
const app = express()

//Middleware para permitir enviar solicitudes a thunderClient o postman
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//Middleware para acceder a rutas
app.use('/users', userRoutes)
app.use('/authors', authorRoutes)
app.use('/books', bookRoutes)



app.listen(PORT, () =>{
    console.log(`Connection to port ${PORT}`)
})