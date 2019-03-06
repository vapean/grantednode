var express = require('express');
var router = express.Router();

const usuarioModel = require('../../models/usuario.model')

// GET http://localhost:3000/api/
router.get('/', function (req, res) {
    res.json({'clave': 'accedo a la ruta API por GET'});
});

// GET http://localhost:3000/api/usuario
router.get('/usuario', function (req, res) {
    // res.json({ 'clave': 'accedo a la ruta API/USUARIOS por GET' });
    usuarioModel.getAll((err, rows) => {
        if(err) return console.log(err.message)
        res.json(rows)
    })
});

// POST http://localhost:3000/api/usuario/new
router.post('/usuario/new', (req, res) => {
    // console.log(req.body) 
    usuarioModel.create(req.body, (err, result) => {
        if(err) return console.log(err.message)
        res.json(result);
    })
    // res.json({ 'clave': 'accedo a la ruta API/USUARIOS/NEW por GET' });
});



module.exports = router;
