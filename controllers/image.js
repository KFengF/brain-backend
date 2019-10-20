const Clarifai = require('clarifai');

const api = new Clarifai.App({
    apiKey : '048a660999314351a3b47adb3c9f933b'
});

const handleAPI = (req, res) => {
    console.log(req.body.input);
    api.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(error => res.status(400).json(error));
}

const handleImage = db => (req, res) => {
    const { id } = req.body;
    db.from('users').where({ id }).increment('entries', 1).returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(()=> res.status(400).json('no such user')); 
}

module.exports = { handleImage, handleAPI }