const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH;
const uuidv1 = require('uuid/v1');
const { user } = require('./../models/')
const refreshDB  = require('./../models/tokens') 
const moment = require('moment')
const { statusMsg } =require('./constants')

//---------AUTH---------
module.exports.generateAccessToken = (payload) => {
  const expiresIn = 60 * 15; //15 min
 
  return jwt.sign(
    payload, 
    accessTokenSecret, 
    {
      expiresIn
    });
}

module.exports.refreshTokens = (username, refreshToken) => {
  //Lookup UUID in database. If it's still valid, issue a new token.
  const userEntry = this.getRefreshTokenEntry(refreshToken);

  if(this.isValidRefreshToken(username, userEntry)){
    const {userid, username, firstName, lastName} = userEntry

    return {
      status: 200,
      message: statusMsg.tokenSuccess,
      accessToken: this.generateAccessToken({
        userid,
        username,
        firstName,
        lastName,
      }),
      refreshToken: this.generateRefreshToken(),
    }
  } else {
    return {
      status: 401,
      message: statusMsg.tokenError
    }
  }
}

//Mocked Functions. Valid returns, not finished.
module.exports.isValidRefreshToken = (username, userEntry) => {
  const date = new Date();
  //Get expiration date from userEntry and see if it's newer than today.
  //Check if POSTed username matches userEntry.username.
  const isAfter = ()=>{
    return true; //shortcutting, need logic
  }
  if(isAfter()){
    return true;
  } else {
    return false;
  }
  
}

//Mocked DB functions.
module.exports.generateRefreshToken = (payload) => {
  //Mocked DB. For now just return UUID;
  //Generate uuid. 
  //Save to database with username, creation date, expiration date. 
  //If storing payload info in token db, save. Otherwise don't save payload info and do a table join/lookup later (performance vs storage)

  const today= new Date();
  const expirationDate = moment(today).add(3, 'days').utc();
  return uuidv1();
}

module.exports.getRefreshTokenEntry = (refreshToken) => {
  //Refresh token may have duplicate user info depending on performance needs. Otherwise, a separate user table with info can be stored and a join can be used to get the other info (username, etc). The refresh table only needs the userid, uuid (refresh token), creation date, and expiration date.

  //Database operation to lookup refreshToken.
  //Find by refreshToken, get expirationDate and payload info for new JWT.
  console.log('refreshDB:', refreshDB)
  return refreshDB;
}

module.exports.authorizeRoutes = (token) => {

}

module.exports.hasRouteAccess = (username, accessToken) => {
  const header = req.headers['authorization']
  
  if(typeof header !== 'undefined'){
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;

   try{
    const isValid = jwt.verify(accessToken, accessTokenSecret)
    
    return isValid.username === username;
   }catch(err){
     return false;
   }
  } else {
    return false;
  }

}

