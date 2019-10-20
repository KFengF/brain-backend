const handleProfile = db => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
    .then(user => {
        user.length ? res.json(user[0])
        : res.status(400).json('No such user');
    })
    .catch(() => res.status(400).json('Error getting this user'));
}

module.exports = { handleProfile };