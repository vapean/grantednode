var express = require('express');
var router = express.Router();


const comentarioModel = require('../../models/comentario.model')

// POST http://localhost:3000/api/comentario/new
router.post('/comentario/new', (req, res) => {
    // res.json({ 'clave': 'accedo a la ruta API/USUARIO/NEW por POST' });
    // console.log(req.body) 

    comentarioModel.addComment(req.body.text, req.body.fk_blog, req.body.token, (err, result) => {
        if (err) return console.log(err.message)
        res.json(result)
    })
});

// POST http://localhost:3000/api/comentario/delete
router.post('/comentario/delete', (req, res) => {
    // res.json({ 'clave': 'accedo a la ruta API/USUARIO/NEW por POST' });
    // console.log(req.body) 
    comentarioModel.deleteComment(req.body.id, (err, result) => {
        if (err) return console.log(err.message)
        res.json(result)
    })
});




module.exports = router;
