//const jwt = require('jsonwebtoken');
//const mailer = require("../config/mailer");

//const User = require('../models/User');
//const BOUser = require('../models/BOUser');
//const PasswordReset = require('../models/PasswordReset');

//const tokenSecret = process.env.JWT_SECRET;

/*
// Webapp Register / Login

async function login(req, res) {

  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: 'Missing credentials',
      result: null
    });
  }

  const foundUser = await User.findOne({
    where: { email, password }  
  });

  if (!foundUser) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: 'Incorrect credentials',
      result: null
    });
  }

  if (!foundUser.active) {
    return res.status(403).json({
      success: false,
      status: 403,
      message: 'The user has been disabled',
      result: null
    });
  }

  // If we got to this point credentials were valid and user was found, generate token
  jwt.sign({ userId: foundUser.id }, tokenSecret, (err, token) => {

    if (err) throw new Error('Error generating JWT token' + '\r\n' + err);

    return res.json({
      success: true,
      status: 200,
      message: 'Log in succesful',
      result: { token }
    });

  });

}

async function register(req, res) {

  const {
    firstName,
    lastName,
    password,
    email,
    dni,
    socialId,
    birthDate,
    phone,
    address,
    googleProfile,
    facebookProfile
  } = req.body;

  // User photos are required, check that
  if (!req.files) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Missing user photos',
      result: null
    });
  }

  // Check for duplicate emails
  const duplicateUser = await User.findOne({
    where: { email }
  });
  if (duplicateUser) {
    return res.status(409).json({
      success: false,
      status: 409,
      message: 'Email already in use',
      result: null
    });
  }

  // Check whether the user pic is an url for a social network or an uploaded file
  let photo = req.body.photo
    ? req.body.photo
    : process.env.HOST + '/uploads/users/' + req.files['photo'][0].filename;
    
  const newUser = await User.create({
    firstName,
    lastName,
    name: firstName + ' ' + lastName,
    password,
    email,
    dni,
    birthDate,
    phone,
    address,
    googleProfile: googleProfile || null,
    facebookProfile: facebookProfile || null,
    points: 0,
    active: 1,
    socialId,
    photo,
    selfiePhoto: req.files['selfiePhoto'][0].filename
  });

  // Email the user
  mailer.sendMail({
    from: process.env.MAIL_FROM_NAME,
    to: email,
    subject: 'Bienvenido a Clemente Jacques® Community',
    template: 'emails/register',
    context: {
      logoUrl: process.env.HOST + '/assets/own/img/logo.png',
      name: firstName + ' ' + lastName
    }
  });

  // Log in the new user and return the token
  jwt.sign({ userId: newUser.id }, tokenSecret, (err, token) => {

    if (err) throw new Error('Error generating JWT token for new user' + '\r\n' + err);

    return res.json({
      success: true,
      status: 200,
      message: 'User created successfully',
      result: {
        token
      }
    });

  });

}

async function verifyToken(req, res, next) {

  const bearerHeader = req.get('authorization');

  if (typeof bearerHeader !== 'undefined') {

    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, tokenSecret, async (err, decoded) => {

      if (err) {
        return res.sendStatus(403);
      }

      const foundUser = await User.findByPk(decoded.userId);

      if (!foundUser) {
        res.sendStatus(403);
      } else {
        req.user = foundUser;
        next();
      }

    })

  } else {
    res.sendStatus(403);
  }

}

// Webapp password reset

async function generateResetToken(req, res) {

  const {
    email
  } = req.body;

  const foundUser = await User.findOne({
    where: { email }
  });

  if (foundUser) {

    const now = new Date();

    const newPwdReset = {
      userId: foundUser.id,
      token: require('crypto').randomBytes(32).toString('hex'),
      expires: now.setHours(now.getHours() + 2)
    }

    await PasswordReset.create(newPwdReset);

    // Email the user
    mailer.sendMail({
      from: process.env.MAIL_FROM_NAME,
      to: email,
      subject: 'Generación de nueva contraseña',
      template: 'emails/resetpass',
      context: {
        logoUrl: process.env.HOST + '/assets/own/img/logo.png',
        name: foundUser.name,
        link: process.env.HOST + '/auth/forgot-password/?token=' + newPwdReset.token
      }
    })

  }

  res.json({
    success: true,
    status: 200,
    message: 'ok',
    result: {}
  });

}

async function showResetPassword(req, res) {

  // If the request comes from a previous succesful password reset, render a success message and return
  if (req.query.success) {
    return res.render('pages/resetpass.handlebars', {
      layout: false,
      success: true
    });
  }

  // Else, keep going with the pwd reset flow
  const now = Date.now();

  const pwdReset = await PasswordReset.findOne({
    where: { token: req.query.token }
  });

  if (pwdReset && parseInt(pwdReset.expires) > now) {

    res.render('pages/resetpass.handlebars', {
      layout: false,
      userId: pwdReset.userId,
      token: req.query.token
    });

  } else {

    res.render('pages/resetpass.handlebars', {
      layout: false,
      failedToken: true
    });

  }

}

async function resetPassword(req, res) {

  const {
    userId,
    token,
    password
  } = req.body;

  const now = Date.now();

  const pwdReset = await PasswordReset.findOne({
    where: { token }
  });

  if (pwdReset && parseInt(pwdReset.expires) > now) {

    await User.update({
      password
    }, {
      where: { id: parseInt(userId) }
    });

    await PasswordReset.destroy({
      where: { token }
    });

    res.redirect('/auth/forgot-password?success=true');

  } else {

    res.render('pages/resetpass.handlebars', {
      layout: false,
      failedToken: true
    });

  }

}
*/

// Backoffice

async function boLogin(req, res) {
/*
  const {
    email,
    password
  } = req.body;

  const foundUser = await BOUser.findOne({
    where: {
      email,
      password
    }
  });

  if (foundUser) {

    if (foundUser.active) {
      req.session.loggedUser = foundUser;
      res.redirect('/');
    } else {
      res.redirect('/login?d=1');
    }

  } else {
    res.redirect('/login?fl=1');
  }  
*/
  req.session.loggedUser = true;
  res.redirect('/');
}

async function boLogout(req, res) {

  req.session.destroy();

  res.redirect('/');
  
}

module.exports = {
  /*generateResetToken,
  showResetPassword,
  resetPassword,
  login,
  register,
  verifyToken,*/
  boLogin,
  boLogout
}