const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) return res.status(400).json('Submission error');
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({ hash, email }).into('login').returning('email')
        .then(email => {
            return trx('users').insert({ 
                email: email[0], 
                name,
                joined: new Date()
            })
            .returning('*')
            .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Unable to register'));
}

module.exports = { handleRegister }