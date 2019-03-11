var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
let tokengn = require('tokengn')




const usuarioModel = require('../../models/usuario.model')

// GET http://localhost:3000/api/
router.get('/', function (req, res) {
    res.json({ 'clave': 'accedo a la ruta API por GET' });
});

// GET http://localhost:3000/api/usuario
router.get('/usuario', function (req, res) {
    // res.json({ 'clave': 'accedo a la ruta API/USUARIO por GET' });
    usuarioModel.getAll((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
});

// POST http://localhost:3000/api/usuario/new
router.post('/usuario/new', (req, res) => {
    // res.json({ 'clave': 'accedo a la ruta API/USUARIO/NEW por POST' });
    // console.log(req.body) 

    usuarioModel.getByUsername(req.body.username, (err, result) => {
        if (err) return console.log(err.message)
        // console.log(result)
        // res.json(result)
        if (result.length > 0) {
            res.json({ 'resultado': false, 'mensaje': 'Nombre de usuario existe' });
        }
        else {
            usuarioModel.create(req.body, (err, result) => {
                if (err) return console.log(err.message)
                // res.json(result)
                res.json({ 'resultado': true, 'mensaje': 'Usuario registrado correctamente' });
            })
        }
    })



});

// POST http://localhost:3000/api/usuario/login
router.post('/usuario/login', (req, res) => {
    // res.json({ 'clave': 'accedo a la ruta API/USUARIO/LOGIN por POST' });
    // console.log(req.body)
    usuarioModel.getByUsername(req.body.username, (err, result) => {
        if (err) return console.log(err.message)
        // console.log(result)
        // res.json(result)
        if (result.length > 0) {
            if (bcrypt.compareSync(req.body.password, result[0].password) == true) {

                let token = tokengn({})
                // console.log(token)
                // console.log(result[0].id)
                usuarioModel.insertToken(token, result[0].id, (err, result) => {
                    if (err) return console.log(err.message)
                    res.json({ 'resultado': true, 'mensaje': 'Usuario y contraseña introducidos correctamente', 'token': token });
                })
            }
            else {
                res.json({ 'resultado': false, 'mensaje': 'Usuario existe pero contraseña incorrecta' });
            }
        }
        else {
            res.json({ 'resultado': false, 'mensaje': 'Usuario no existe' });
        }
    })
});



// POST http://localhost:3000/api/usuario
router.post('/usuario', (req, res) => {
    // console.log(req.body.token)
    usuarioModel.getUserByToken(req.body.token, (err, result) => {
        // console.log(result)
        res.json(result);

    })
});

// POST http://localhost:3000/api/usuario/update
router.post('/usuario/update', (req, res) => {
    console.log(req.body)
    usuarioModel.updateUser(req.body, (err, result) => {
        // console.log(result)
        console.log(err)
        console.log(result)
        res.json({'resultado':true, 'mensaje':'Usuario modificado corectamente'});

    })
});




module.exports = router;
