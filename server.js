
var accountSid="YOUR ID"
var authToken="YOUR TOKEN"
var twilioNumber="YOUR TWILIONUMBER"
var yourNumber="YOUR NUMBER"

var client = require('twilio')(accountSid,authToken)

var express=require('express');
var bodyParser=require('body-parser')
var path=require('path')
var app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/contact',function(req,res) {
  res.sendFile(path.join(__dirname + '/contact.html'));
})

app.post('/contact',function(req,res) {
  var mess=req.body.message +" "+ req.body.name+" "+req.body.number+" "+req.body.email

  client.messages.create({
    to: yourNumber,
    from: twilioNumber,
    body: mess,
  }, function(err, message) {
    if(err) {
      console.log(err)
    }
    console.log(message.sid);
  });

})


var port= process.env.PORT || 3000

app.listen(port,function(req,res) {
  console.log('listening on'+ port)
})
