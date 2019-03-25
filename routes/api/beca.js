var express = require('express');
var router = express.Router();


const becaModel = require('../../models/beca.model')


// POST http://localhost:3000/api/becas
router.post('/becas', (req, res) => {
    becaModel.getBecasByFiltro(req.body, async (err, result) => {
        console.log(err)
        try {
            let becasFav = await becaModel.getBecasFav(req.body.token)

            console.log(becasFav)

            let arrRespuesta = result.map((item) => {
                if (becasFav.find(fav => fav.fk_becas == item.id)) {
                    return item.isFavorite = true
                } else {
                    return item
                }
            })

            // console.log(arrRespuesta)
            // Elemento devuelto de nuevo_array
            res.json(result);
        }
        catch (err) {
            console.log(err)
        }

    })
});

// POST http://localhost:3000/api/becas/fav
router.post('/becas/fav', (req, res) => {
    becaModel.addBecaFav(req.body.fk_becas, req.body.token, (err, result) => {
        console.log(err)
        res.json(result);
    })
})


// POST http://localhost:3000/api/becas/unfav
router.post('/becas/unfav', (req, res) => {
    becaModel.deleteBecaFav(req.body.fk_becas, req.body.token, (err, result) => {
        console.log(err)
        res.json(result);
    })
})


// POST http://localhost:3000/api/becas/usuario
router.post('/becas/usuario', async(req, res) => {
    console.log(req.body.token)
    let result = await becaModel.getBecasFavUsuario(req.body.token)
    res.json(result)
})

router.post('/becas/id', (req, res) => {
    becaModel.getBecasById(req.body.beca_id, (err, result) => {
        console.log(err)
        res.json(result)
    })
})


module.exports = router;
