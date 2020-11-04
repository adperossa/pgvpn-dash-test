const express = require('express');
const router = express.Router();
const multer = require('multer');
const Auth = require('../auth/Auth');

//const tokenSecret = process.env.JWT_SECRET;
/*
const { users } = require('../config/multerConf');
const upload = multer({ storage: users });
const uplUser = upload.fields([{
  name: 'selfiePhoto',
  maxCount: 1
}, {
  name: 'photo',
  maxCount: 1,
}])

// Webapp login / register / reset password

router.post('/reset-password', Auth.generateResetToken);

router.get('/forgot-password', Auth.showResetPassword);

router.post('/forgot-password', Auth.resetPassword);

router.post('/login', Auth.login);

router.post('/register', uplUser, Auth.register);

*/

// Backoffice login / logout

router.post('/bologin', Auth.boLogin);

router.get('/bologout', Auth.boLogout);

module.exports = router;