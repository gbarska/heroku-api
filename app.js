//load our app server using express somehow...
const express =require('express')
const app = express()
const mysql = require('mysql')

const bodyParser = require('body-parser')

path = require('path')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

//ROUTER
const router = require('./routes/clientes.js')

app.use(router)


app.get("/",(req,res)=>{
    console.log("Responding to root index")
     res.sendFile(path.join(__dirname+'/index.html'))
    //res.send("hello world")
})

app.listen(3003,() => {
console.log("Server is up and listening on 3003")
})
