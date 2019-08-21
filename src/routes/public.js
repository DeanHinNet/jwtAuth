const { generateAccessToken, generateRefreshToken, refreshTokens } = require('../helpers/auth') 
const { user } = require('./../models/')
const { statusMsg } = require('../helpers/constants')

module.exports = (app) => {
  app.post('/login', (req, res)=>{
    const {body} = req;
      
    //Mock Database
    //Find user from db based on username.
    //If no username is found, return error. Array will be empty.
    const dbFind = [user]; 

    if(dbFind.length === 0){
      res.status(401).send(statusMsg.loginError)
    } else {
      const {userid, username, firstName, lastName, password} = dbFind[0]

      if(body.username === username && body.password === password){
        //If credentials are verified, generate and send tokens.
        res.status(200).send({
          accessToken: generateAccessToken({
            userid,
            username,
            firstName,
            lastName,
          }),
          refreshToken: generateRefreshToken()
        });
      } else {
        res.status(401).send(statusMsg.loginError);
      }
    }
   
  })

  app.post('/token', (req, res)=>{
    const { username, refreshToken } = req.body
    res.json(refreshTokens(username, refreshToken))
  })
}