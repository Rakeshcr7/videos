const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const port = 3000;
const api = require('./server/routes/api')

app.use(express.static(path.join(__dirname,'dist')))

app.use(bodyParser.urlencoded ({ extended:true }))
app.use(bodyParser.json())

app.use('/api',api)

app.get('*' , (req,res) => {
res.sendFile(path.join(__dirname , 'dist/VideoPlayer/index.html'))
})

app.listen( port , function(){
  console.log("server is Running on "+ port)
}

)