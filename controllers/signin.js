const handleSingIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json('Submission error');
    db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => {
        bcrypt.compareSync(password, data[0].hash) ?
            db.select('*').from('users').where({ email })
            .then(user => res.json(user[0]))
            .catch(() => res.status(400).json('Unable to get user'))
            : res.status(400).json('Wrong credentials');
    })
    .catch(() => res.status(400).json('Wrong credentials'));   
}

module.exports = { handleSingIn }