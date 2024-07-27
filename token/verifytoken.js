const jwt = require("jsonwebtoken");
const jwtKey = "Funwithsnaptak";

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({result:'Please provide Valid token'});
       
      }else{
        next()
      }
    });
  } else {
    res.status(403).send({ result: "Please add with token headers" });
  }

 
}
module.exports = { verifyToken };
