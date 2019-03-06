const db = require('../db')

let getAll = (done) => {
 db.get().query('select * from granted.usuarios', (err, rows) => {
     if (err) return done(err)
     done(null, rows)
})
}



module.exports = {
 getAll: getAll
}