const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = {

  login: async (req, res) => {

    let { email, password, employee } = req.body;
    const db = req.app.get('db');

    let userData = null;
    email = email.toLowerCase();

    if (!employee) {
      userData = await db.query('select * from Customer WHERE email = $1', [email]);
    };
    if (employee) {
      userData = await db.query('select * from Employee WHERE email = $1', [email]);
    };

    if (!userData || !userData.length) {
      return res.status(401).send({message: 'Invalid Email'});
    };

    const compare = bcrypt.compareSync(password, userData[0].hash);

    if (!compare) {
      console.log('wrong');
      return res.status(401).send('Incorrect Password');
    };

    req.session.user = userData[0];
    delete req.session.user.hash;
    res.status(200).send(req.session.user);
  },


  register: async (req, res) => {
    const db = req.app.get('db');
    let { firstName, lastName, email, password, userType, employee, number } = req.body;

    let userData;
    email = email.toLowerCase();
    if (!employee) {
      userData = await db.query('select * from Customer WHERE email = $1', [email]);
    }

    if (employee) {
      userData = await db.query('select * from Employee WHERE email = $1', [email]);
    }


    if (userData.length) {
      return res.status(401).send('Email already in use')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let time = new Date();
    time = moment(time).format('YYYY-MM-DD hh:mm:ss')

    let newUser;
    if (!employee) {
      newUser = await db.createCustomer(firstName, lastName, email, hash, time, number);
    }

    if (employee) {
      newUser = await db.createEmployee(firstName, lastName, email, userType, hash, time, number);
    }

    req.session.user = newUser[0];
    delete req.session.user.hash;
    res.status(200).send(req.session.user);

  },

  getUser: (req, res) => {
    if (req.session.user) {
      return res.status(200).send(req.session.user)
    }
    res.status(401).send('Please log in');
  },

  logout: (req, res) => {
    delete req.session.user;
    res.sendStatus(200)
  }

}