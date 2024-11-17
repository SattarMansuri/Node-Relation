const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Db connected!");
}).catch((error) => {
  console.log( error);
})
const route = require('./route')

app.use(express.json())
app.use('/api', route)

app.get('/', (req, res)=>{
  res.json({message: "This is running perfect"})
})



app.listen(process.env.PORT, (err)=>{
  if(err){
    console.log(err)
  }else{
    console.log('server is started')
  }
})