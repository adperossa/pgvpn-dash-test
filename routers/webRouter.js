const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const authRouter = require('./authRouter');

router.get('/login', (req, res) => {

  const failedLogin = req.query.fl ? true : false;
  const deactivated = req.query.d ? true : false;
  res.render('pages/login.handlebars', { layout: false, failedLogin, deactivated });
  
});

router.use('/auth', authRouter);

// Restrict unlogged users from going further
router.use((req, res, next) => {

  if (!req.session.loggedUser) {
    res.redirect('/login');
  } else {
    next();
  }

});


router.get('/', async (req, res) => {

  const relaysData = await fetch('https://api.proguardvpn.com/v1/relays').then(res => res.json());
  let relayList = [];
  for (const relay of relaysData.wireguard.relays) {
    let { country, city } = relaysData.locations[relay.location];
    relayList.push({
      country,
      city,
      address: `${relay.ipv4_addr_in}:${relaysData.wireguard.port_ranges[0][0]}`,
      gateway: relaysData.wireguard.ipv4_gateway
    });
  }

  let peers = [];
  for (let i = 0; i < 10; i++) {
    peers.push({
      address: '10.64.0.2',
      rx: '1.48 MiB',
      tx: '192.77 KiB',
      last_handshake: '37 days, 34 minutes, 26 seconds ago'
    })
  }

  res.render('serverList', {
    section: 'Server List',
    relayList,
    peers
  });

});

module.exports = router;