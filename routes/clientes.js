//will contain all of my users related routes

//load our app server using express somehow...
const express =require('express')
//load mysql somehow...
const mysql = require('mysql')

//ROUTER
const router = express.Router()

router.get('/messages',(req,res)=>{
    console.log("Show some messages or whatever...")
    res.end()
})


router.get('/cliente/:id',(req,res)=>{
    console.log("Fetching user with id: "+req.params.id)
    
    const connection = mysql.createConnection({
        host:   'localhost',
        user: 'cajama84_root',
        password: 'prodbcrm',
        database: 'cajama84_prodbcrm'

    })

    const revendaId = req.params.id
    const queryString = "SELECT * FROM TBCRM1_CLI WHERE REVENDA_ID = ?"

    connection.query(queryString,[revendaId],(err, rows, fields)=>{
        
        if(err){
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        res.end()
        return
        }

        console.log("I think we fetched users successfully")

        //specifies how the data will be sent
        const clientes = rows.map((cliente) => {
            return {
               cliente
            }
        })

        res.json(clientes)
    })

    //res.end()
})

router.post("/user_create",(req,res)=>{
    console.log("Trying to create a new user...")
    console.log("First Name: "+req.body.firstName)

    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const queryString = "INSERT INTO TBCRM1_LEAD_HIST (ID,DATA,DESCRICAO,ID_CLI) VALUES(?,?,'BLABLA',114)"
    con = getConnection()

    console.log('connection received...')

    con.query(queryString, [firstName,lastName],(err,results, fields) =>{
  
    if (err){
        console.log("Failed to insert new user: "+err)
        res.sendStatus(500)
        return
    }   

    console.log("Inserted a new user with id: ", results.insertId)
    })

    res.end()
})


router.get("/api",(req,res)=>{
    console.log("Responding to root route")
    var  users=[]
    var user1 = {firstName:"Stephen",lastName: "Curry"}
    const user2 = {firstName: "Kevin", lastName: "Durant"}
    users.push(user1);
    users.push(user2)
    res.status(202).json(users)
})

const pool= mysql.createPool({
        connectionLimit: 10,
        host:   'localhost',
        user: 'cajama84_root',
        password: 'prodbcrm',
        database: 'cajama84_prodbcrm' 
})

function getConnection(){
    // console.log('trying to get connection...')
    return pool
}

module.exports = router