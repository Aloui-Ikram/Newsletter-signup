const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const https =require("https");

const   app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
res.sendFile(__dirname + "/signup.html")
});
app.post("/",function(req,res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.mail;

  const data= {
    members:[
       {
         email_address:email,
         status : "subscribed",
         merge_fields:{
            FNAME:firstName,
            LNAME:lastName
         }

       }
    ]
  }
  var jsonData = JSON.stringify(data);
  const url="https://us11.api.mailchimp.com/3.0/lists/a7713f7071";
  const option = {
    method:"POST",
    auth:"ikram1:5305cd3216cd90829b7b4c4eb3da141f-us11"
  }
const request= https.request(url,option, function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));

  if (response.statusCode===200){
    res.sendFile(__dirname +"/success.html");
  }
  else{
    res.sendFile(__dirname +"/failure.html");

  }

})
})
request.write(jsonData);
request.end();
})

app.post("/failure", function(res,req){
  res.redirect("/")
})

app.listen(process.env.port ||3000, function(req,res){
  console.log("server is running on port 3000");
});
//appi key
//5305cd3216cd90829b7b4c4eb3da141f-us11
//list id
// a7713f7071
