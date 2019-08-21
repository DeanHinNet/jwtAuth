const express = require('express');
const router = express.Router();
const {hasRouteAccess} = require('../helpers/auth')
const {statusMsg} = require('../helpers/constants')

router.use((req, res, next) => {
  const { accessToken, username } = req.body

  if(hasRouteAccess(username, accessToken)){
    next();
  } else {
    res.status(401).send(statusMsg.unauthorized);
  }

})
//Add Get Catchall
//Add Post Catchcall

router.post('/credentials', (req, res) => {
  //Update sensitive user credentials, password, email, etc. May need password/email confirmation in order to change.
  res.status(200).send('Ok')
})
router.post('/profile', (req, res) => {
  //Update user info address, preferences, etc.
  res.status(200).send('Ok')
})

module.exports = (app) => {
  app.use('/user', router)
};