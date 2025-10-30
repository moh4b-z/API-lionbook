const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use(cors()) 
app.use(bodyParser.json())

const MainRoutes = require('./src/routes/MainRoutes.js')

app.use("/v1/lionbook", MainRoutes)


const port = process.env.PORT || 8080
app.listen(port, function(){
    console.log(`API aguardando requisição na porta ${port}...`)
})