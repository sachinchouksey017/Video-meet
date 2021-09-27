const express = require('express')
const app = express()
 const PORT=3000;
 const server=require('http').Server(app)
 const { v4: uuidv4 } = require('uuid');
 const uuid=uuidv4()
 console.log(uuid);
 app.set('view engine','ejs')
 app.use(express.static('public'))
app.get('/', function (req, res) {
  res.redirect(`/${uuidv4()}`)
})
 
app.get('/:room', function (req, res) {
    res.render('index',{roomId:req.params.room})
  })
server.listen(PORT,()=>{
    console.log(`Server started on port number http://localhost:${PORT}/`);
})