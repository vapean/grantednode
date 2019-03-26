const db = require('../db')

let getComentsByPost = (id, done) => {
    db.get().query('SELECT c.text, c.date, c.id, c.likes, u.name, u.image, u.token FROM comentarios as c JOIN usuarios as u WHERE fk_blog= ? AND fk_usuario = u.id ', [id], (err, rows) => {
        console.log(done)
        if (err) return done(err)
        done(null, rows)
    })
}

let addComment = (text, fk_blog, token, done) => {
    db.get().query('INSERT INTO comentarios (`text`, `fk_blog`, `fk_usuario`) VALUES ( ?, ?, (SELECT usuarios.id from usuarios where token= ?))', [text, fk_blog, token], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

let deleteComment = (id, done) => {
    db.get().query('DELETE FROM comentarios WHERE id = ?', [id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

let likeComment = (likes, id, done) => {
    db.get().query('UPDATE comentarios SET likes= ? where id= ?', [likes, id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}



module.exports = {
    getComentsByPost: getComentsByPost,
    addComment: addComment,
    deleteComment: deleteComment,
    likeComment:likeComment
}