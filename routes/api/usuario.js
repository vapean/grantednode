var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
let tokengn = require('tokengn')
const Promise = require('bluebird')



const usuarioModel = require('../../models/usuario.model')



// GET http://localhost:3000/api/usuario
router.get('/usuario', function (req, res) {
    usuarioModel.getAll((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
});


// POST http://localhost:3000/api/usuario/new
router.post('/usuario/new', (req, res) => {
    usuarioModel.getByUsername(req.body.username, (err, result) => {
        if (err) return console.log(err.message)
        if (result.length > 0) {
            res.json({ 'resultado': false, 'mensaje': 'Ups... Alguien se te adelantó con ese nombre de usuario' });
        }
        else {
            usuarioModel.create(req.body, (err, result) => {
                if (err) return console.log(err.message)
                res.json({ 'resultado': true, 'mensaje': '¡Bienvenido a la familia!' });
            })
        }
    })
});


// POST http://localhost:3000/api/usuario/login
router.post('/usuario/login', (req, res) => {
    usuarioModel.getByUsername(req.body.username, (err, result) => {
        if (err) return console.log(err.message)
        if (result.length > 0) {
            if (bcrypt.compareSync(req.body.password, result[0].password) == true) {
                let token = tokengn({})
                usuarioModel.insertToken(token, result[0].id, (err, result) => {
                    if (err) return console.log(err.message)
                    res.json({ 'resultado': true, 'mensaje': '¡Me alegro de verte de nuevo!', 'token': token });
                })
            }
            else {
                res.json({ 'resultado': false, 'mensaje': 'Ups... me suena ese nombre... pero revisa la contraseña' });
            }
        }
        else {
            res.json({ 'resultado': false, 'mensaje': 'Ups... comprueba de nuevo ese nombre' });
        }
    })
});


// POST http://localhost:3000/api/usuario
router.post('/usuario', (req, res) => {
    usuarioModel.getUserByToken(req.body.token, (err, result) => {
        res.json(result);
    })
});


// POST http://localhost:3000/api/usuario/update
router.post('/usuario/update', (req, res) => {
    console.log(req.body)
    usuarioModel.updateUser(req.body, (err, result) => {
        console.log(err)
        console.log(result)
        res.json({'resultado':true, 'mensaje':'¡Lo tengo! Estos datos ya no se me olvidan'});
    })
});




module.exports = router;
