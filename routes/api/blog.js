var express = require('express');
var router = express.Router();

const blogModel = require('../../models/blog.model')
const comentarioModel = require('../../models/comentario.model')



// GET http://localhost:3000/api/blog/importantes
router.get('/blog/importantes', function (req, res) {
    blogModel.getBlogImportant((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
});


router.get('/blog/newPosts', function (req, res) {
    blogModel.getBlogRecent(async(err, rows) => {
        if (err) return console.log(err.message)
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i].id)
            let resCat = await blogModel.getCategoriasByBlog(rows[i].id)
            rows[i].categorias = resCat
        }
        res.json(rows)
    })
});


// POST http://localhost:3000/api/blog/post
router.post('/blog/post', (req, res) => {
    blogModel.getPostById(req.body.id, (err, resultp) => {
        comentarioModel.getComentsByPost(req.body.id, (err, resultc) => {
            if (err) return console.log(err.message)
            console.log(resultc)
            resultp[0].comentarios = resultc;
            res.json(resultp[0]);
        })
        if (err) return console.log(err.message)
    })
});

// POST http://localhost:3000/api/blog/keyword
// router.post('/blog/keyword', (req, res) => {
//     // console.log(req.body.id)
//     blogModel.getBlogByKeyword(req.body.keyword, (err, result) => {
        
//         if (err) return console.log(err.message)
//         // console.log(result)
//         res.json(result);

//     })
// });


// GET http://localhost:3000/api/blog/categoria
router.get('/blog/categorias', function (req, res) {
    blogModel.getAllCategorias((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
})


// POST http://localhost:3000/api/blog/categoria
router.post('/blog/categoria', (req, res) => {
    blogModel.getBlogByCategoria(req.body.categoria, async (err, result) => {
        if (err) return console.log(err.message)
        for (let i = 0; i < result.length; i++){
            let resCat = await blogModel.getCategoriasByBlog(result[i].id)
            result[i].categorias = resCat
        }
        res.json(result);
    })
})


module.exports = router;
