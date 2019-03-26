const db = require('../db')
const Promise = require('bluebird')

let getBlogImportant = (done) => {
    db.get().query('SELECT * FROM granted.blog WHERE id<5', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}


let getBlogRecent = (done) => {
    db.get().query('SELECT * FROM blog ORDER BY id DESC ', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}


let getPostById = (id, done) => {
    db.get().query('SELECT * FROM granted.blog WHERE id= ?', [id], (err, rows) => {
        console.log(done)
        if (err) return done(err)
        done(null, rows)
    })
}

// let getBlogByKeyword= (keyword, done) => {
//     db.get().query('SELECT * FROM granted.blog WHERE key_words LIKE ? ', ['%'+keyword+'%'], (err, rows) => {
//         console.log(done)
//         if (err) return done(err)
//         done(null, rows)
//     })
// }


let getAllCategorias = (done) => {
    db.get().query('SELECT * FROM granted.categorias', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}


let getBlogByCategoria = (categoria, done) => {
    db.get().query('SELECT blog.title, blog.description, blog.imagen_2, categorias.name, blog.id FROM granted.categorias, granted.blog, tabla_indices_categorias_blog WHERE fk_categorias= ? AND fk_blog=blog.id AND fk_categorias=categorias.id', [categoria], (err, rows) => {
        console.log(done)
        if (err) return done(err)
        done(null, rows)
    })
}


let getCategoriasByBlog = (blog_id, done) => {
    return new Promise((resolve, reject) => {
        db.get().query('select c.id, c.name from categorias c, tabla_indices_categorias_blog cb where c.id = cb.fk_categorias and cb.fk_blog = ?', [blog_id], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}


module.exports = {
    getBlogImportant: getBlogImportant,
    getBlogRecent: getBlogRecent,
    getPostById: getPostById,
    // getBlogByKeyword: getBlogByKeyword,
    getAllCategorias: getAllCategorias,
    getBlogByCategoria: getBlogByCategoria,
    getCategoriasByBlog: getCategoriasByBlog

}