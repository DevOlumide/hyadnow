const express = require("express");
const router = express.Router();
const usermodelSchemaCopy = require("../models/usermodels");
const bcrypt = require("bcryptjs");
var test = "Working";

router.post("/register", async (request, response) => {
  var salt = bcrypt.genSaltSync(8);
  
  const registered = new usermodelSchemaCopy({
    companyName: request.body.companyName,
    companyEmail: request.body.companyEmail,
    password: bcrypt.hashSync(request.body.password,salt),
    phone_no: request.body.phone_no,
    country: request.body.country,
    province: request.body.province,
    postal: request.body.postal
  });
  registered.save().then((data) => response.json(data)).catch(err => console.log(err));
  console.log(registered);
});



router.post("/login", async(request,response) => {

  var loginDetails = {
    companyEmail: request.body.companyEmail,
    password: request.body.password
  }
  
  usermodelSchemaCopy.find({
  companyEmail: loginDetails.companyEmail,
  },function(err,result){
    
    result.map((res) => {
      if(err){
        response.send(err)
      }else{
        if(bcrypt.compareSync(loginDetails.password, res.password) === true){
          console.log(result);
        }else{
          var work = "incorrect password";
          console.log("incorrect password");
        }
      }
    });
  });
 return response.send("worked");
});
router.get("/", function(req,res){
  res.send("Working in heroku");
});
module.exports = router;